import { CLF_C02_QUESTIONS } from "@/data/questions";
import { DomainScore, QuestionDomain } from "@/types/exam";

export interface ScoreCalculationResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  domainScores: DomainScore[];
  performanceTier: "Excellent" | "Strong" | "Good" | "Needs Improvement";
  performanceTierColor: string;
}

export function calculateExamScore(
  answers: Record<number, string[]>
): ScoreCalculationResult {
  const totalQuestions = CLF_C02_QUESTIONS.length;
  let correctCount = 0;
  let answeredCount = 0;

  const domainMap = new Map<
    QuestionDomain,
    { total: number; correct: number }
  >();

  // Initialize domain map
  for (const q of CLF_C02_QUESTIONS) {
    if (!domainMap.has(q.domain)) {
      domainMap.set(q.domain, { total: 0, correct: 0 });
    }
    domainMap.get(q.domain)!.total += 1;
  }

  // Grade each question
  for (const q of CLF_C02_QUESTIONS) {
    const selected = answers[q.id];
    const isAnswered = Array.isArray(selected) && selected.length > 0;

    if (isAnswered) {
      answeredCount++;
    }

    let isCorrect = false;

    if (isAnswered) {
      const sortedSelected = [...selected].sort().join(",");
      const sortedCorrect = [...q.correctAnswer].sort().join(",");
      if (sortedSelected === sortedCorrect) {
        isCorrect = true;
      }
    }

    if (isCorrect) {
      correctCount += q.points || 1;
      const domainStat = domainMap.get(q.domain);
      if (domainStat) {
        domainStat.correct += 1;
      }
    }
  }

  const score = correctCount;
  const percentage = Number(((score / totalQuestions) * 100).toFixed(2));
  const unansweredCount = totalQuestions - answeredCount;
  const incorrectCount = answeredCount - correctCount;

  // Domain score array
  const domainScores: DomainScore[] = Array.from(domainMap.entries()).map(
    ([domain, stats]) => ({
      domain,
      correct: stats.correct,
      total: stats.total,
      percentage: Number(((stats.correct / stats.total) * 100).toFixed(1)),
    })
  );

  // Performance tier
  let performanceTier: "Excellent" | "Strong" | "Good" | "Needs Improvement";
  let performanceTierColor = "text-aws-muted";

  if (percentage >= 85) {
    performanceTier = "Excellent";
    performanceTierColor = "text-emerald-400";
  } else if (percentage >= 70) {
    performanceTier = "Strong";
    performanceTierColor = "text-sky-400";
  } else if (percentage >= 55) {
    performanceTier = "Good";
    performanceTierColor = "text-amber-400";
  } else {
    performanceTier = "Needs Improvement";
    performanceTierColor = "text-rose-400";
  }

  return {
    score,
    totalQuestions,
    percentage,
    answeredCount,
    correctCount,
    incorrectCount,
    unansweredCount,
    domainScores,
    performanceTier,
    performanceTierColor,
  };
}
