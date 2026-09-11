import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawName = body?.name;

    if (!rawName || typeof rawName !== "string") {
      return NextResponse.json(
        { success: false, error: "Participant name is required." },
        { status: 400 }
      );
    }

    const cleanName = rawName.trim().replace(/\s+/g, " ");

    if (cleanName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Participant name must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (cleanName.length > 80) {
      return NextResponse.json(
        { success: false, error: "Participant name is too long." },
        { status: 400 }
      );
    }

    const config = await db.getConfig();
    const isDemo = process.env.DEMO_MODE === "true";

    if (config.status === "ended" && !isDemo) {
      return NextResponse.json(
        { success: false, error: "The examination has ended." },
        { status: 403 }
      );
    }

    if (config.status === "upcoming" && !isDemo) {
      return NextResponse.json(
        {
          success: false,
          error: "The examination has not started yet.",
          startTime: config.startTime,
        },
        { status: 403 }
      );
    }

    // Register or fetch participant
    const participant = await db.createParticipant(cleanName);

    // Check existing attempt
    let attempt = await db.getAttemptByParticipantName(cleanName);

    if (attempt) {
      if (attempt.status === "submitted" || attempt.status === "auto_submitted") {
        return NextResponse.json({
          success: true,
          alreadySubmitted: true,
          attemptId: attempt.id,
          message: "This examination attempt has already been submitted.",
        });
      }

      // In-progress attempt: calculate time remaining
      const startedMs = new Date(attempt.startedAt).getTime();
      const elapsedSec = Math.floor((Date.now() - startedMs) / 1000);
      const totalAllowedSec = (config.durationMinutes || 90) * 60;
      const timeRemainingSeconds = Math.max(0, totalAllowedSec - elapsedSec);

      if (timeRemainingSeconds <= 0) {
        // Time expired while user was away: auto-submit
        const finalAttempt = await db.submitAttempt(attempt.id, attempt.answers, true);
        return NextResponse.json({
          success: true,
          alreadySubmitted: true,
          attemptId: finalAttempt.id,
          message: "Your examination time expired and has been submitted automatically.",
        });
      }

      return NextResponse.json({
        success: true,
        isResume: true,
        attemptId: attempt.id,
        participantId: participant.id,
        participantName: cleanName,
        startedAt: attempt.startedAt,
        durationMinutes: config.durationMinutes,
        timeRemainingSeconds,
        savedAnswers: attempt.answers || {},
      });
    }

    // Create fresh attempt
    const newAttempt = await db.createAttempt(participant.id, cleanName);

    return NextResponse.json({
      success: true,
      isResume: false,
      attemptId: newAttempt.id,
      participantId: participant.id,
      participantName: cleanName,
      startedAt: newAttempt.startedAt,
      durationMinutes: config.durationMinutes,
      timeRemainingSeconds: config.durationMinutes * 60,
      savedAnswers: {},
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to start examination" },
      { status: 500 }
    );
  }
}
