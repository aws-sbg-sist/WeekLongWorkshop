import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CLF_C02_QUESTIONS } from "@/data/questions";
import { QuestionReviewItem } from "@/types/exam";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const attemptId = params.id;
    if (!attemptId) {
      return NextResponse.json(
        { success: false, error: "Missing attempt ID." },
        { status: 400 }
      );
    }

    const attempt = await db.getAttemptById(attemptId);
    if (!attempt) {
      return NextResponse.json(
        { success: false, error: "Attempt not found." },
        { status: 404 }
      );
    }

    const config = await db.getConfig();

    let reviewItems: QuestionReviewItem[] | null = null;

    // Only expose answers & explanations if admin enabled answerReviewEnabled
    if (config.answerReviewEnabled && attempt.submittedAt) {
      reviewItems = CLF_C02_QUESTIONS.map((q) => {
        const selected = attempt.answers[q.id] || [];
        const isCorrect =
          [...selected].sort().join(",") === [...q.correctAnswer].sort().join(",");
        return {
          ...q,
          selectedAnswer: selected,
          isCorrect,
        };
      });
    }

    // Performance Tier calculation
    let performanceTier: "Excellent" | "Strong" | "Good" | "Needs Improvement";
    if (attempt.percentage >= 85) performanceTier = "Excellent";
    else if (attempt.percentage >= 70) performanceTier = "Strong";
    else if (attempt.percentage >= 55) performanceTier = "Good";
    else performanceTier = "Needs Improvement";

    return NextResponse.json({
      success: true,
      attempt: {
        id: attempt.id,
        participantName: attempt.participantName,
        examTitle: config.examTitle,
        institution: config.institution,
        startedAt: attempt.startedAt,
        submittedAt: attempt.submittedAt,
        status: attempt.status,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        percentage: attempt.percentage,
        timeUsedSeconds: attempt.timeUsedSeconds,
        domainScores: attempt.domainScores || [],
        answeredCount: Object.keys(attempt.answers).filter(
          (k) => (attempt.answers[Number(k)] || []).length > 0
        ).length,
        performanceTier,
      },
      answerReviewEnabled: config.answerReviewEnabled,
      reviewItems,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch attempt." },
      { status: 500 }
    );
  }
}
