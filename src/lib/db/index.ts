import { jsonStore } from "./json-store";
import { isSupabaseConfigured, supabaseStore } from "./supabase";
import {
  ExamAttempt,
  ExamConfig,
  LeaderboardEntry,
  Participant,
} from "@/types/exam";

function getStore() {
  if (isSupabaseConfigured()) {
    return supabaseStore;
  }
  return jsonStore;
}

// Unified DB interface
export const db = {
  async getConfig(): Promise<ExamConfig> {
    return getStore().getConfig();
  },

  async updateConfig(updates: Partial<ExamConfig>): Promise<ExamConfig> {
    return getStore().updateConfig(updates);
  },

  async getParticipants(): Promise<Participant[]> {
    return getStore().getParticipants();
  },

  async createParticipant(name: string): Promise<Participant> {
    return getStore().createParticipant(name);
  },

  async bulkImportParticipants(names: string[]): Promise<number> {
    return getStore().bulkImportParticipants(names);
  },

  async getAttemptByParticipantName(name: string): Promise<ExamAttempt | null> {
    return getStore().getAttemptByParticipantName(name);
  },

  async getAttemptById(attemptId: string): Promise<ExamAttempt | null> {
    return getStore().getAttemptById(attemptId);
  },

  async createAttempt(
    participantId: string,
    participantName: string
  ): Promise<ExamAttempt> {
    return getStore().createAttempt(participantId, participantName);
  },

  async saveProgress(
    attemptId: string,
    answers: Record<number, string[]>
  ): Promise<ExamAttempt> {
    return getStore().saveProgress(attemptId, answers);
  },

  async submitAttempt(
    attemptId: string,
    answers: Record<number, string[]>,
    isAuto = false
  ): Promise<ExamAttempt> {
    return getStore().submitAttempt(attemptId, answers, isAuto);
  },

  async getAllAttempts(): Promise<ExamAttempt[]> {
    return getStore().getAllAttempts();
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    return getStore().getLeaderboard();
  },

  async resetExamData(): Promise<void> {
    return getStore().resetExamData();
  },
};
