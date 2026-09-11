import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { attemptId, answers = {}, isAuto = false } = body;

    if (!attemptId) {
      return NextResponse.json(
        { success: false, error: "Missing attempt ID." },
        { status: 400 }
      );
    }

    const attempt = await db.getAttemptById(attemptId);
    if (!attempt) {
      return NextResponse.json(
        { success: false, error: "Exam attempt not found." },
        { status: 404 }
      );
    }

    if (attempt.status === "submitted" || attempt.status === "auto_submitted") {
      return NextResponse.json({
        success: true,
        alreadySubmitted: true,
        attemptId: attempt.id,
        score: attempt.score,
        percentage: attempt.percentage,
        timeUsedSeconds: attempt.timeUsedSeconds,
        domainScores: attempt.domainScores,
      });
    }

    const finalAttempt = await db.submitAttempt(attemptId, answers, isAuto);

    return NextResponse.json({
      success: true,
      alreadySubmitted: false,
      attemptId: finalAttempt.id,
      score: finalAttempt.score,
      totalQuestions: finalAttempt.totalQuestions,
      percentage: finalAttempt.percentage,
      timeUsedSeconds: finalAttempt.timeUsedSeconds,
      domainScores: finalAttempt.domainScores,
      status: finalAttempt.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit examination." },
      { status: 500 }
    );
  }
}
