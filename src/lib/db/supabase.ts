import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  ExamAttempt,
  ExamConfig,
  LeaderboardEntry,
  Participant,
} from "@/types/exam";
import { calculateExamScore } from "../scoring";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!client) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials are not configured in environment.");
    }
    client = createClient(supabaseUrl, supabaseKey);
  }
  return client;
}

export const supabaseStore = {
  async getConfig(): Promise<ExamConfig> {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("exams")
      .select("*")
      .eq("id", "clf-c02-exam")
      .maybeSingle();

    if (error) {
      console.error("Supabase getConfig error:", error);
      throw error;
    }

    if (!data) {
      // Seed default record if missing
      const defaultRecord = {
        id: "clf-c02-exam",
        name: "AWS Cloud Practitioner Week Long Workshop",
        exam_title: "AWS Certified Cloud Practitioner — CLF-C02 Mock Examination",
        institution: "Sathyabama Institute of Science and Technology, Chennai",
        status: "live",
        start_time: new Date().toISOString(),
        end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        duration_minutes: 90,
        total_questions: 65,
        expected_participants: 100,
        leaderboard_enabled: false,
        results_enabled: true,
        answer_review_enabled: false,
      };

      const { data: inserted, error: insertError } = await supabase
        .from("exams")
        .insert(defaultRecord)
        .select()
        .single();

      if (insertError) throw insertError;
      return mapExamConfig(inserted);
    }

    return mapExamConfig(data);
  },

  async updateConfig(updates: Partial<ExamConfig>): Promise<ExamConfig> {
    const supabase = getClient();
    const payload: Record<string, any> = {
      id: "clf-c02-exam",
      name: "AWS Cloud Practitioner Week Long Workshop",
      exam_title: "AWS Certified Cloud Practitioner — CLF-C02 Mock Examination",
      institution: "Sathyabama Institute of Science and Technology, Chennai",
      duration_minutes: 90,
      total_questions: 65,
      updated_at: new Date().toISOString(),
    };

    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.startTime !== undefined) payload.start_time = updates.startTime;
    if (updates.endTime !== undefined) payload.end_time = updates.endTime;
    if (updates.durationMinutes !== undefined)
      payload.duration_minutes = updates.durationMinutes;
    if (updates.expectedParticipants !== undefined)
      payload.expected_participants = updates.expectedParticipants;
    if (updates.leaderboardEnabled !== undefined)
      payload.leaderboard_enabled = updates.leaderboardEnabled;
    if (updates.resultsEnabled !== undefined)
      payload.results_enabled = updates.resultsEnabled;
    if (updates.answerReviewEnabled !== undefined)
      payload.answer_review_enabled = updates.answerReviewEnabled;

    const { data, error } = await supabase
      .from("exams")
      .upsert(payload, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("Supabase updateConfig error:", error);
      throw error;
    }
    return mapExamConfig(data);
  },


  async getParticipants(): Promise<Participant[]> {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []).map((p) => ({
      id: p.id,
      name: p.name,
      createdAt: p.created_at,
    }));
  },

  async createParticipant(name: string): Promise<Participant> {
    const supabase = getClient();
    const cleanName = name.trim().replace(/\s+/g, " ");

    // Check existing
    const { data: existing } = await supabase
      .from("participants")
      .select("*")
      .ilike("name", cleanName)
      .maybeSingle();

    if (existing) {
      return {
        id: existing.id,
        name: existing.name,
        createdAt: existing.created_at,
      };
    }

    const newId = `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const { data, error } = await supabase
      .from("participants")
      .insert({
        id: newId,
        name: cleanName,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      name: data.name,
      createdAt: data.created_at,
    };
  },

  async bulkImportParticipants(names: string[]): Promise<number> {
    const supabase = getClient();
    let count = 0;

    for (const raw of names) {
      const cleanName = raw.trim().replace(/\s+/g, " ");
      if (cleanName.length > 1) {
        const { data: existing } = await supabase
          .from("participants")
          .select("id")
          .ilike("name", cleanName)
          .maybeSingle();

        if (!existing) {
          const newId = `p_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          await supabase.from("participants").insert({
            id: newId,
            name: cleanName,
            created_at: new Date().toISOString(),
          });
          count++;
        }
      }
    }
    return count;
  },

  async getAttemptByParticipantName(name: string): Promise<ExamAttempt | null> {
    const supabase = getClient();
    const cleanName = name.trim().replace(/\s+/g, " ");

    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .ilike("participant_name", cleanName)
      .maybeSingle();

    if (error || !data) return null;
    return mapExamAttempt(data);
  },

  async getAttemptById(attemptId: string): Promise<ExamAttempt | null> {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .eq("id", attemptId)
      .maybeSingle();

    if (error || !data) return null;
    return mapExamAttempt(data);
  },

  async createAttempt(
    participantId: string,
    participantName: string
  ): Promise<ExamAttempt> {
    const supabase = getClient();
    const cleanName = participantName.trim().replace(/\s+/g, " ");

    // Check existing attempt
    const existing = await this.getAttemptByParticipantName(cleanName);
    if (existing) return existing;

    const newId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const newRecord = {
      id: newId,
      participant_id: participantId,
      participant_name: cleanName,
      exam_id: "clf-c02-exam",
      started_at: new Date().toISOString(),
      submitted_at: null,
      status: "in_progress",
      score: 0,
      total_questions: 65,
      percentage: 0.0,
      time_used_seconds: 0,
      answers: {},
      domain_scores: null,
      last_active_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("attempts")
      .insert(newRecord)
      .select()
      .single();

    if (error) throw error;
    return mapExamAttempt(data);
  },

  async saveProgress(
    attemptId: string,
    answers: Record<number, string[]>
  ): Promise<ExamAttempt> {
    const supabase = getClient();
    const current = await this.getAttemptById(attemptId);
    if (!current) throw new Error(`Attempt ${attemptId} not found`);

    if (current.status !== "in_progress") return current;

    const mergedAnswers = { ...current.answers, ...answers };
    const { data, error } = await supabase
      .from("attempts")
      .update({
        answers: mergedAnswers,
        last_active_at: new Date().toISOString(),
      })
      .eq("id", attemptId)
      .select()
      .single();

    if (error) throw error;
    return mapExamAttempt(data);
  },

  async submitAttempt(
    attemptId: string,
    answers: Record<number, string[]>,
    isAuto = false
  ): Promise<ExamAttempt> {
    const supabase = getClient();
    const current = await this.getAttemptById(attemptId);
    if (!current) throw new Error(`Attempt ${attemptId} not found`);

    if (current.status !== "in_progress") return current;

    const finalAnswers = { ...current.answers, ...answers };
    const grading = calculateExamScore(finalAnswers);

    const submittedAt = new Date().toISOString();
    const elapsedMs =
      new Date(submittedAt).getTime() - new Date(current.startedAt).getTime();
    const elapsedSec = Math.max(1, Math.floor(elapsedMs / 1000));
    const timeUsedSeconds = Math.min(elapsedSec, 90 * 60);

    const updatePayload = {
      answers: finalAnswers,
      score: grading.score,
      total_questions: grading.totalQuestions,
      percentage: grading.percentage,
      domain_scores: grading.domainScores,
      submitted_at: submittedAt,
      status: isAuto ? "auto_submitted" : "submitted",
      time_used_seconds: timeUsedSeconds,
      last_active_at: submittedAt,
    };

    const { data, error } = await supabase
      .from("attempts")
      .update(updatePayload)
      .eq("id", attemptId)
      .select()
      .single();

    if (error) throw error;
    return mapExamAttempt(data);
  },

  async getAllAttempts(): Promise<ExamAttempt[]> {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .order("started_at", { ascending: false });

    if (error) throw error;
    return (data || []).map(mapExamAttempt);
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .in("status", ["submitted", "auto_submitted"])
      .order("score", { ascending: false })
      .order("time_used_seconds", { ascending: true });

    if (error) throw error;

    return (data || []).map((att, idx) => ({
      rank: idx + 1,
      participantName: att.participant_name,
      score: att.score,
      percentage: Number(att.percentage),
      timeUsedSeconds: att.time_used_seconds,
      submittedAt: att.submitted_at || att.started_at,
    }));
  },

  async resetExamData(): Promise<void> {
    const supabase = getClient();
    await supabase.from("attempts").delete().neq("id", "none");
    await supabase.from("participants").delete().neq("id", "none");
    await supabase.from("exams").update({
      status: "live",
      leaderboard_enabled: false,
      results_enabled: true,
      answer_review_enabled: false,
      updated_at: new Date().toISOString(),
    }).eq("id", "clf-c02-exam");
  },
};

function mapExamConfig(row: any): ExamConfig {
  return {
    id: row.id,
    name: row.name,
    examTitle: row.exam_title,
    institution: row.institution,
    status: row.status,
    startTime: row.start_time,
    endTime: row.end_time,
    durationMinutes: row.duration_minutes,
    totalQuestions: row.total_questions,
    expectedParticipants: row.expected_participants,
    leaderboardEnabled: row.leaderboard_enabled,
    resultsEnabled: row.results_enabled,
    answerReviewEnabled: row.answer_review_enabled,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapExamAttempt(row: any): ExamAttempt {
  return {
    id: row.id,
    participantId: row.participant_id,
    participantName: row.participant_name,
    examId: row.exam_id,
    startedAt: row.started_at,
    submittedAt: row.submitted_at,
    status: row.status,
    score: row.score,
    totalQuestions: row.total_questions,
    percentage: Number(row.percentage),
    timeUsedSeconds: row.time_used_seconds,
    answers: row.answers || {},
    domainScores: row.domain_scores || [],
    lastActiveAt: row.last_active_at,
  };
}
