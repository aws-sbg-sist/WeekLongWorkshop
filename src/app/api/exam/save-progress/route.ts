import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { attemptId, answers } = body;

    if (!attemptId || !answers) {
      return NextResponse.json(
        { success: false, error: "Missing attemptId or answers." },
        { status: 400 }
      );
    }

    const attempt = await db.saveProgress(attemptId, answers);

    return NextResponse.json({
      success: true,
      lastActiveAt: attempt.lastActiveAt,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save progress" },
      { status: 500 }
    );
  }
}
