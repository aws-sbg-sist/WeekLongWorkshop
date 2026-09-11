import { jsonStore } from "./json-store";
import {
  ExamAttempt,
  ExamConfig,
  LeaderboardEntry,
  Participant,
} from "@/types/exam";

// Unified DB interface
export const db = {
  async getConfig(): Promise<ExamConfig> {
    return jsonStore.getConfig();
  },

  async updateConfig(updates: Partial<ExamConfig>): Promise<ExamConfig> {
    return jsonStore.updateConfig(updates);
  },

  async getParticipants(): Promise<Participant[]> {
    return jsonStore.getParticipants();
  },

  async createParticipant(name: string): Promise<Participant> {
    return jsonStore.createParticipant(name);
  },

  async bulkImportParticipants(names: string[]): Promise<number> {
    return jsonStore.bulkImportParticipants(names);
  },

  async getAttemptByParticipantName(name: string): Promise<ExamAttempt | null> {
    return jsonStore.getAttemptByParticipantName(name);
  },

  async getAttemptById(attemptId: string): Promise<ExamAttempt | null> {
    return jsonStore.getAttemptById(attemptId);
  },

  async createAttempt(
    participantId: string,
    participantName: string
  ): Promise<ExamAttempt> {
    return jsonStore.createAttempt(participantId, participantName);
  },

  async saveProgress(
    attemptId: string,
    answers: Record<number, string[]>
  ): Promise<ExamAttempt> {
    return jsonStore.saveProgress(attemptId, answers);
  },

  async submitAttempt(
    attemptId: string,
    answers: Record<number, string[]>,
    isAuto = false
  ): Promise<ExamAttempt> {
    return jsonStore.submitAttempt(attemptId, answers, isAuto);
  },

  async getAllAttempts(): Promise<ExamAttempt[]> {
    return jsonStore.getAllAttempts();
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    return jsonStore.getLeaderboard();
  },

  async resetExamData(): Promise<void> {
    return jsonStore.resetExamData();
  },
};
