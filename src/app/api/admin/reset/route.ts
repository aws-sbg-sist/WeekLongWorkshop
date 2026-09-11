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
    const { confirmation } = body;

    if (confirmation !== "RESET_EXAM_CONFIRMED") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid confirmation. You must provide confirmation: 'RESET_EXAM_CONFIRMED' to reset the exam.",
        },
        { status: 400 }
      );
    }

    await db.resetExamData();

    return NextResponse.json({
      success: true,
      message: "All exam attempts and participant records have been successfully reset.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to reset exam." },
      { status: 500 }
    );
  }
}
