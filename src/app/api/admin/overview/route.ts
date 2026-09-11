import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const config = await db.getConfig();
    const participants = await db.getParticipants();
    const attempts = await db.getAllAttempts();

    const expectedParticipants = config.expectedParticipants || 100;
    const currentParticipantsCount = participants.length;

    const inProgressCount = attempts.filter((a) => a.status === "in_progress").length;
    const submittedAttempts = attempts.filter(
      (a) => a.status === "submitted" || a.status === "auto_submitted"
    );
    const submittedCount = submittedAttempts.length;
    const notStartedCount = Math.max(0, currentParticipantsCount - attempts.length);

    let averageScore = 0;
    let highestScore = 0;
    let lowestScore = 0;
    let completionPercentage = 0;

    if (submittedCount > 0) {
      const scores = submittedAttempts.map((a) => a.score);
      const totalScore = scores.reduce((sum, s) => sum + s, 0);
      averageScore = Number((totalScore / submittedCount).toFixed(1));
      highestScore = Math.max(...scores);
      lowestScore = Math.min(...scores);
      completionPercentage = Number(
        ((submittedCount / (currentParticipantsCount || 1)) * 100).toFixed(1)
      );
    }

    return NextResponse.json({
      success: true,
      config,
      kpis: {
        expectedParticipants,
        currentParticipantsCount,
        inProgressCount,
        submittedCount,
        notStartedCount,
        averageScore,
        highestScore,
        lowestScore,
        completionPercentage,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load overview." },
      { status: 500 }
    );
  }
}
