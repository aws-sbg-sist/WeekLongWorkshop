import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Cache config in memory for 2.5 seconds to protect database from polling flood
let cachedConfig: any = null;
let lastCacheTime = 0;

export async function GET() {
  try {
    const now = Date.now();
    if (!cachedConfig || now - lastCacheTime > 2500) {
      cachedConfig = await db.getConfig();
      lastCacheTime = now;
    }

    return NextResponse.json(
      {
        success: true,
        config: {
          id: cachedConfig.id,
          name: cachedConfig.name,
          examTitle: cachedConfig.examTitle,
          institution: cachedConfig.institution,
          status: cachedConfig.status,
          startTime: cachedConfig.startTime,
          endTime: cachedConfig.endTime,
          durationMinutes: cachedConfig.durationMinutes,
          totalQuestions: cachedConfig.totalQuestions,
          expectedParticipants: cachedConfig.expectedParticipants,
          leaderboardEnabled: cachedConfig.leaderboardEnabled,
          resultsEnabled: cachedConfig.resultsEnabled,
          answerReviewEnabled: cachedConfig.answerReviewEnabled,
        },
        stats: {
          activeParticipants: 0,
          completedSubmissions: 0,
        },
        serverTime: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=2, stale-while-revalidate=4",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch exam info" },
      { status: 500 }
    );
  }
}
