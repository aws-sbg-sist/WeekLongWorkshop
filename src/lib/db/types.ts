import { ExamConfig, ExamAttempt, Participant } from "@/types/exam";

export interface DatabaseStore {
  config: ExamConfig;
  participants: Participant[];
  attempts: ExamAttempt[];
}
