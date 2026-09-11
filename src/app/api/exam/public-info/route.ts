import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = await db.getConfig();
    const attempts = await db.getAllAttempts();

    const activeCount = attempts.filter((a) => a.status === "in_progress").length;
    const submittedCount = attempts.filter(
      (a) => a.status === "submitted" || a.status === "auto_submitted"
    ).length;

    return NextResponse.json({
      success: true,
      config: {
        id: config.id,
        name: config.name,
        examTitle: config.examTitle,
        institution: config.institution,
        status: config.status,
        startTime: config.startTime,
        endTime: config.endTime,
        durationMinutes: config.durationMinutes,
        totalQuestions: config.totalQuestions,
        expectedParticipants: config.expectedParticipants,
        leaderboardEnabled: config.leaderboardEnabled,
        resultsEnabled: config.resultsEnabled,
        answerReviewEnabled: config.answerReviewEnabled,
      },
      stats: {
        activeParticipants: activeCount,
        completedSubmissions: submittedCount,
      },
      serverTime: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch exam info" },
      { status: 500 }
    );
  }
}
