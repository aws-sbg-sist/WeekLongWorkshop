import fs from "fs/promises";
import path from "path";
import { DatabaseStore } from "./types";
import {
  ExamAttempt,
  ExamConfig,
  LeaderboardEntry,
  Participant,
} from "@/types/exam";
import { calculateExamScore } from "../scoring";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "exam_store.json");

const DEFAULT_CONFIG: ExamConfig = {
  id: "clf-c02-exam",
  name: "AWS Cloud Practitioner Week Long Workshop",
  examTitle: "AWS Certified Cloud Practitioner — CLF-C02 Mock Examination",
  institution: "Sathyabama Institute of Science and Technology, Chennai",
  status: "live",
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  durationMinutes: 90,
  totalQuestions: 65,
  expectedParticipants: 100,
  leaderboardEnabled: false,
  resultsEnabled: true,
  answerReviewEnabled: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

let memoryStore: DatabaseStore | null = null;
let writeQueue: Promise<void> = Promise.resolve();

async function ensureDataFile(): Promise<DatabaseStore> {
  if (memoryStore) {
    return memoryStore;
  }

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(STORE_FILE, "utf-8");
    memoryStore = JSON.parse(content);
    // Ensure all required fields exist
    if (!memoryStore!.config) {
      memoryStore!.config = { ...DEFAULT_CONFIG };
    }
    if (!memoryStore!.participants) {
      memoryStore!.participants = [];
    }
    if (!memoryStore!.attempts) {
      memoryStore!.attempts = [];
    }
    return memoryStore!;
  } catch {
    // If file doesn't exist or is invalid, seed defaults
    const initial: DatabaseStore = {
      config: { ...DEFAULT_CONFIG },
      participants: [],
      attempts: [],
    };
    memoryStore = initial;
    await persistStore(initial);
    return initial;
  }
}

async function persistStore(store: DatabaseStore): Promise<void> {
  memoryStore = store;
  writeQueue = writeQueue.then(async () => {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      const tempPath = `${STORE_FILE}.tmp.${Date.now()}`;
      await fs.writeFile(tempPath, JSON.stringify(store, null, 2), "utf-8");
      await fs.rename(tempPath, STORE_FILE);
    } catch (err) {
      console.error("Failed to persist exam store to disk:", err);
    }
  });
  await writeQueue;
}

export const jsonStore = {
  async getConfig(): Promise<ExamConfig> {
    const store = await ensureDataFile();
    return store.config;
  },

  async updateConfig(updates: Partial<ExamConfig>): Promise<ExamConfig> {
    const store = await ensureDataFile();
    store.config = {
      ...store.config,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await persistStore(store);
    return store.config;
  },

  async getParticipants(): Promise<Participant[]> {
    const store = await ensureDataFile();
    return store.participants;
  },

  async createParticipant(name: string): Promise<Participant> {
    const store = await ensureDataFile();
    const cleanName = name.trim().replace(/\s+/g, " ");

    let existing = store.participants.find(
      (p) => p.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (existing) {
      return existing;
    }

    const newParticipant: Participant = {
      id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      createdAt: new Date().toISOString(),
    };

    store.participants.push(newParticipant);
    await persistStore(store);
    return newParticipant;
  },

  async bulkImportParticipants(names: string[]): Promise<number> {
    const store = await ensureDataFile();
    let count = 0;

    for (const raw of names) {
      const cleanName = raw.trim().replace(/\s+/g, " ");
      if (
        cleanName.length > 1 &&
        !store.participants.some(
          (p) => p.name.toLowerCase() === cleanName.toLowerCase()
        )
      ) {
        store.participants.push({
          id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          name: cleanName,
          createdAt: new Date().toISOString(),
        });
        count++;
      }
    }

    if (count > 0) {
      await persistStore(store);
    }
    return count;
  },

  async getAttemptByParticipantName(name: string): Promise<ExamAttempt | null> {
    const store = await ensureDataFile();
    const cleanName = name.trim().toLowerCase();
    const attempt = store.attempts.find(
      (a) => a.participantName.toLowerCase() === cleanName
    );
    return attempt || null;
  },

  async getAttemptById(attemptId: string): Promise<ExamAttempt | null> {
    const store = await ensureDataFile();
    const attempt = store.attempts.find((a) => a.id === attemptId);
    return attempt || null;
  },

  async createAttempt(
    participantId: string,
    participantName: string
  ): Promise<ExamAttempt> {
    const store = await ensureDataFile();
    const cleanName = participantName.trim().replace(/\s+/g, " ");

    // Check if attempt already exists
    const existing = store.attempts.find(
      (a) => a.participantName.toLowerCase() === cleanName.toLowerCase()
    );
    if (existing) {
      return existing;
    }

    const newAttempt: ExamAttempt = {
      id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      participantId,
      participantName: cleanName,
      examId: store.config.id,
      startedAt: new Date().toISOString(),
      submittedAt: null,
      status: "in_progress",
      score: 0,
      totalQuestions: 65,
      percentage: 0,
      timeUsedSeconds: 0,
      answers: {},
      lastActiveAt: new Date().toISOString(),
    };

    store.attempts.push(newAttempt);
    await persistStore(store);
    return newAttempt;
  },

  async saveProgress(
    attemptId: string,
    answers: Record<number, string[]>
  ): Promise<ExamAttempt> {
    const store = await ensureDataFile();
    const attempt = store.attempts.find((a) => a.id === attemptId);
    if (!attempt) {
      throw new Error(`Attempt ${attemptId} not found`);
    }

    if (attempt.status !== "in_progress") {
      return attempt; // Already submitted
    }

    attempt.answers = { ...attempt.answers, ...answers };
    attempt.lastActiveAt = new Date().toISOString();

    await persistStore(store);
    return attempt;
  },

  async submitAttempt(
    attemptId: string,
    answers: Record<number, string[]>,
    isAuto = false
  ): Promise<ExamAttempt> {
    const store = await ensureDataFile();
    const attempt = store.attempts.find((a) => a.id === attemptId);
    if (!attempt) {
      throw new Error(`Attempt ${attemptId} not found`);
    }

    if (attempt.status !== "in_progress") {
      return attempt; // Prevent double submission
    }

    const finalAnswers = { ...attempt.answers, ...answers };
    attempt.answers = finalAnswers;

    const grading = calculateExamScore(finalAnswers);
    attempt.score = grading.score;
    attempt.totalQuestions = grading.totalQuestions;
    attempt.percentage = grading.percentage;
    attempt.domainScores = grading.domainScores;

    const submittedAt = new Date().toISOString();
    attempt.submittedAt = submittedAt;
    attempt.status = isAuto ? "auto_submitted" : "submitted";

    const elapsedMs =
      new Date(submittedAt).getTime() - new Date(attempt.startedAt).getTime();
    const elapsedSec = Math.max(1, Math.floor(elapsedMs / 1000));
    attempt.timeUsedSeconds = Math.min(elapsedSec, 90 * 60);

    await persistStore(store);
    return attempt;
  },

  async getAllAttempts(): Promise<ExamAttempt[]> {
    const store = await ensureDataFile();
    return store.attempts;
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const store = await ensureDataFile();
    const submittedAttempts = store.attempts.filter(
      (a) => a.status === "submitted" || a.status === "auto_submitted"
    );

    // Sort: 1. Higher score, 2. Faster completion time
    const sorted = [...submittedAttempts].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timeUsedSeconds - b.timeUsedSeconds;
    });

    return sorted.map((att, idx) => ({
      rank: idx + 1,
      participantName: att.participantName,
      score: att.score,
      percentage: att.percentage,
      timeUsedSeconds: att.timeUsedSeconds,
      submittedAt: att.submittedAt || att.startedAt,
    }));
  },

  async resetExamData(): Promise<void> {
    const store = await ensureDataFile();
    store.attempts = [];
    store.participants = [];
    store.config = {
      ...DEFAULT_CONFIG,
      updatedAt: new Date().toISOString(),
    };
    await persistStore(store);
  },
};
