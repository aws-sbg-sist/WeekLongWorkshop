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

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const statusFilter = searchParams.get("status") || "all";
    const sortBy = searchParams.get("sortBy") || "name";
    const sortOrder = searchParams.get("sortOrder") || "asc";

    const participants = await db.getParticipants();
    const attempts = await db.getAllAttempts();

    const attemptMap = new Map(
      attempts.map((a) => [a.participantName.toLowerCase(), a])
    );

    // Build unified participant rows
    let rows = participants.map((p) => {
      const att = attemptMap.get(p.name.toLowerCase());
      return {
        id: p.id,
        name: p.name,
        registeredAt: p.createdAt,
        attemptId: att?.id || null,
        status: att ? att.status : "not_started",
        score: att ? att.score : null,
        percentage: att ? att.percentage : null,
        timeUsedSeconds: att ? att.timeUsedSeconds : null,
        startedAt: att ? att.startedAt : null,
        submittedAt: att ? att.submittedAt : null,
        answeredCount: att
          ? Object.keys(att.answers || {}).filter(
              (k) => (att.answers[Number(k)] || []).length > 0
            ).length
          : 0,
      };
    });

    // Also include any attempts that registered directly without pre-registration
    for (const att of attempts) {
      const exists = rows.some(
        (r) => r.name.toLowerCase() === att.participantName.toLowerCase()
      );
      if (!exists) {
        rows.push({
          id: att.participantId,
          name: att.participantName,
          registeredAt: att.startedAt,
          attemptId: att.id,
          status: att.status,
          score: att.score,
          percentage: att.percentage,
          timeUsedSeconds: att.timeUsedSeconds,
          startedAt: att.startedAt,
          submittedAt: att.submittedAt,
          answeredCount: Object.keys(att.answers || {}).filter(
            (k) => (att.answers[Number(k)] || []).length > 0
          ).length,
        });
      }
    }

    // Filter by search
    if (search) {
      rows = rows.filter((r) => r.name.toLowerCase().includes(search));
    }

    // Filter by status
    if (statusFilter !== "all") {
      rows = rows.filter((r) => r.status === statusFilter);
    }

    // Sort
    rows.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "score") {
        comparison = (a.score ?? -1) - (b.score ?? -1);
      } else if (sortBy === "time") {
        comparison = (a.timeUsedSeconds ?? 99999) - (b.timeUsedSeconds ?? 99999);
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status);
      } else if (sortBy === "submittedAt") {
        const timeA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const timeB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        comparison = timeA - timeB;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

    return NextResponse.json({
      success: true,
      total: rows.length,
      participants: rows,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load participants." },
      { status: 500 }
    );
  }
}
