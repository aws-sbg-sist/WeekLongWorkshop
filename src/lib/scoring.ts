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

  const safeAnswers = answers || {};

  // Grade each question
  for (const q of CLF_C02_QUESTIONS) {
    const rawSelected: any =
      safeAnswers[q.id] ?? (safeAnswers as any)[String(q.id)];

    let selected: string[] = [];
    if (Array.isArray(rawSelected)) {
      selected = rawSelected.filter(
        (s) => s != null && String(s).trim().length > 0
      );
    } else if (typeof rawSelected === "string" && rawSelected.trim().length > 0) {
      selected = [rawSelected.trim()];
    }

    const isAnswered = selected.length > 0;

    if (isAnswered) {
      answeredCount++;
    }

    let isCorrect = false;

    if (isAnswered) {
      const normalizedSelected = Array.from(
        new Set(selected.map((s) => String(s).trim().toUpperCase()))
      )
        .sort()
        .join(",");
      const sortedCorrect = [...q.correctAnswer]
        .map((s) => String(s).trim().toUpperCase())
        .sort()
        .join(",");
      if (normalizedSelected === sortedCorrect) {
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
  const percentage =
    totalQuestions > 0
      ? Number(((score / totalQuestions) * 100).toFixed(2))
      : 0;
  const unansweredCount = totalQuestions - answeredCount;
  const incorrectCount = Math.max(0, answeredCount - correctCount);

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
