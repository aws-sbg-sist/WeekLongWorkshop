export type QuestionDomain =
  | "Cloud Concepts"
  | "Security and Compliance"
  | "Cloud Technology and Services"
  | "Billing, Pricing, and Support";

export type QuestionType = "single" | "multiple";
export type Difficulty = "easy" | "medium" | "hard";

export interface QuestionOption {
  id: string; // "A", "B", "C", "D", "E"
  text: string;
}

export interface Question {
  id: number;
  domain: QuestionDomain;
  topic: string;
  questionType: QuestionType;
  multipleResponseCount?: number;
  question: string;
  options: QuestionOption[];
  correctAnswer: string[]; // e.g. ["B"] or ["A", "C"]
  explanation: string;
  difficulty: Difficulty;
  points: number;
}

export interface ClientQuestion {
  id: number;
  domain?: QuestionDomain;
  topic?: string;
  questionType: QuestionType;
  multipleResponseCount?: number;
  question: string;
  options: QuestionOption[];
  points: number;
}

export type ExamStatus = "upcoming" | "live" | "ended";

export interface ExamConfig {
  id: string;
  name: string;
  examTitle: string;
  institution: string;
  status: ExamStatus;
  startTime: string; // ISO string
  endTime: string; // ISO string
  durationMinutes: number;
  totalQuestions: number;
  expectedParticipants: number;
  leaderboardEnabled: boolean;
  resultsEnabled: boolean;
  answerReviewEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  id: string;
  name: string;
  createdAt: string;
}

export type AttemptStatus = "in_progress" | "submitted" | "auto_submitted";

export interface DomainScore {
  domain: QuestionDomain;
  correct: number;
  total: number;
  percentage: number;
}

export interface ExamAttempt {
  id: string;
  participantId: string;
  participantName: string;
  examId: string;
  startedAt: string;
  submittedAt: string | null;
  status: AttemptStatus;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeUsedSeconds: number;
  answers: Record<number, string[]>; // questionId -> selected options ["A"] or ["A", "C"]
  domainScores?: DomainScore[];
  lastActiveAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  participantName: string;
  score: number;
  percentage: number;
  timeUsedSeconds: number;
  submittedAt: string;
}

export interface QuestionReviewItem extends Question {
  selectedAnswer: string[];
  isCorrect: boolean;
}
