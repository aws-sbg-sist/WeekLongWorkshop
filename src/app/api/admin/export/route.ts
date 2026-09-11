import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { CLF_C02_QUESTIONS } from "@/data/questions";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const attempts = await db.getAllAttempts();
    const submittedAttempts = attempts.filter(
      (a) => a.status === "submitted" || a.status === "auto_submitted"
    );

    // Sort by: 1. Higher score, 2. Lower time used
    submittedAttempts.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timeUsedSeconds - b.timeUsedSeconds;
    });

    // Generate CSV lines
    const headers = [
      "Rank",
      "Participant Name",
      "Score",
      "Percentage",
      "Correct",
      "Incorrect",
      "Unanswered",
      "Time Used",
      "Submitted At",
    ];

    const rows = submittedAttempts.map((att, index) => {
      const rank = index + 1;
      const cleanName = `"${att.participantName.replace(/"/g, '""')}"`;
      const score = att.score;
      const percentage = `${att.percentage}%`;
      const correct = att.score;
      const answeredCount = CLF_C02_QUESTIONS.filter((q) => {
        const raw = att.answers[q.id] ?? (att.answers as any)[String(q.id)];
        return Array.isArray(raw) ? raw.length > 0 : Boolean(raw);
      }).length;
      const incorrect = Math.max(0, answeredCount - correct);
      const unanswered = Math.max(0, 65 - answeredCount);

      const mins = Math.floor(att.timeUsedSeconds / 60);
      const secs = att.timeUsedSeconds % 60;
      const timeUsed = `${mins}m ${secs}s`;
      const submittedAt = att.submittedAt
        ? new Date(att.submittedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })
        : "N/A";

      return [
        rank,
        cleanName,
        score,
        percentage,
        correct,
        incorrect,
        unanswered,
        `"${timeUsed}"`,
        `"${submittedAt}"`,
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="aws_clf_c02_mock_results_${Date.now()}.csv"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to export CSV." },
      { status: 500 }
    );
  }
}
