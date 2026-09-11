import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function POST(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const allowedFields = [
      "status",
      "startTime",
      "endTime",
      "durationMinutes",
      "expectedParticipants",
      "leaderboardEnabled",
      "resultsEnabled",
      "answerReviewEnabled",
    ];

    const updates: Record<string, any> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    const updatedConfig = await db.updateConfig(updates);

    if (updates.status === "ended") {
      try {
        const attempts = await db.getAllAttempts();
        const inProgress = attempts.filter((a) => a.status === "in_progress");
        for (const att of inProgress) {
          try {
            await db.submitAttempt(att.id, att.answers || {}, true);
          } catch (err) {
            console.warn(`Failed to auto-submit attempt ${att.id}:`, err);
          }
        }
      } catch (err) {
        console.warn("Failed to auto-submit in-progress attempts on exam end:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Exam settings updated successfully.",
      config: updatedConfig,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update controls." },
      { status: 500 }
    );
  }
}
