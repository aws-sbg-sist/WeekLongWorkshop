import { jsonStore } from "./json-store";
import { isSupabaseConfigured, supabaseStore } from "./supabase";
import {
  ExamAttempt,
  ExamConfig,
  LeaderboardEntry,
  Participant,
} from "@/types/exam";

// Unified DB interface with resilient automatic fallback
export const db = {
  async getConfig(): Promise<ExamConfig> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.getConfig();
      } catch (err) {
        console.warn("Supabase getConfig fallback to jsonStore:", err);
      }
    }
    return jsonStore.getConfig();
  },

  async updateConfig(updates: Partial<ExamConfig>): Promise<ExamConfig> {
    if (isSupabaseConfigured()) {
      try {
        const res = await supabaseStore.updateConfig(updates);
        try {
          await jsonStore.updateConfig(updates);
        } catch {}
        return res;
      } catch (err) {
        console.warn("Supabase updateConfig fallback to jsonStore:", err);
      }
    }
    return jsonStore.updateConfig(updates);
  },

  async getParticipants(): Promise<Participant[]> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.getParticipants();
      } catch (err) {
        console.warn("Supabase getParticipants fallback:", err);
      }
    }
    return jsonStore.getParticipants();
  },

  async createParticipant(name: string): Promise<Participant> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.createParticipant(name);
      } catch (err) {
        console.warn("Supabase createParticipant fallback:", err);
      }
    }
    return jsonStore.createParticipant(name);
  },

  async bulkImportParticipants(names: string[]): Promise<number> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.bulkImportParticipants(names);
      } catch (err) {
        console.warn("Supabase bulkImportParticipants fallback:", err);
      }
    }
    return jsonStore.bulkImportParticipants(names);
  },

  async getAttemptByParticipantName(name: string): Promise<ExamAttempt | null> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.getAttemptByParticipantName(name);
      } catch (err) {
        console.warn("Supabase getAttemptByParticipantName fallback:", err);
      }
    }
    return jsonStore.getAttemptByParticipantName(name);
  },

  async getAttemptById(attemptId: string): Promise<ExamAttempt | null> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.getAttemptById(attemptId);
      } catch (err) {
        console.warn("Supabase getAttemptById fallback:", err);
      }
    }
    return jsonStore.getAttemptById(attemptId);
  },

  async createAttempt(
    participantId: string,
    participantName: string
  ): Promise<ExamAttempt> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.createAttempt(participantId, participantName);
      } catch (err) {
        console.warn("Supabase createAttempt fallback:", err);
      }
    }
    return jsonStore.createAttempt(participantId, participantName);
  },

  async saveProgress(
    attemptId: string,
    answers: Record<number, string[]>
  ): Promise<ExamAttempt> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.saveProgress(attemptId, answers);
      } catch (err) {
        console.warn("Supabase saveProgress fallback:", err);
      }
    }
    return jsonStore.saveProgress(attemptId, answers);
  },

  async submitAttempt(
    attemptId: string,
    answers: Record<number, string[]>,
    isAuto = false
  ): Promise<ExamAttempt> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.submitAttempt(attemptId, answers, isAuto);
      } catch (err) {
        console.warn("Supabase submitAttempt fallback:", err);
      }
    }
    return jsonStore.submitAttempt(attemptId, answers, isAuto);
  },

  async getAllAttempts(): Promise<ExamAttempt[]> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.getAllAttempts();
      } catch (err) {
        console.warn("Supabase getAllAttempts fallback:", err);
      }
    }
    return jsonStore.getAllAttempts();
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStore.getLeaderboard();
      } catch (err) {
        console.warn("Supabase getLeaderboard fallback:", err);
      }
    }
    return jsonStore.getLeaderboard();
  },

  async resetExamData(): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabaseStore.resetExamData();
      } catch (err) {
        console.warn("Supabase resetExamData fallback:", err);
      }
    }
    return jsonStore.resetExamData();
  },
};
