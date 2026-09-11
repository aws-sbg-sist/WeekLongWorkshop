import { NextResponse } from "next/server";
import { getClientQuestions } from "@/data/questions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Get client questions stripped of answers and explanations
    const questions = getClientQuestions();

    return NextResponse.json({
      success: true,
      total: questions.length,
      questions,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load questions" },
      { status: 500 }
    );
  }
}
