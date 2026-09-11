import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    if (!verifyAdminAuth(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { names } = body;

    if (!Array.isArray(names) || names.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid list of participant names." },
        { status: 400 }
      );
    }

    const count = await db.bulkImportParticipants(names);

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${count} new participant(s).`,
      importedCount: count,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to import participants." },
      { status: 500 }
    );
  }
}
