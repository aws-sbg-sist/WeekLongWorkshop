import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = await db.getConfig();

    if (!config.leaderboardEnabled) {
      return NextResponse.json({
        published: false,
        message: "The leaderboard has not been published yet.",
        eventTitle: config.examTitle,
        institution: config.institution,
      });
    }

    const leaderboard = await db.getLeaderboard();

    return NextResponse.json({
      published: true,
      eventTitle: config.examTitle,
      institution: config.institution,
      totalEntries: leaderboard.length,
      leaderboard,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch leaderboard." },
      { status: 500 }
    );
  }
}
