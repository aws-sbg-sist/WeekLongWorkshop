"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { QuestionReviewItem } from "@/types/exam";

interface AttemptResultData {
  attempt: {
    id: string;
    participantName: string;
    examTitle: string;
    institution: string;
    startedAt: string;
    submittedAt: string;
    status: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    timeUsedSeconds: number;
    answeredCount: number;
    domainScores: Array<{
      domain: string;
      correct: number;
      total: number;
      percentage: number;
    }>;
    performanceTier: "Excellent" | "Strong" | "Good" | "Needs Improvement";
  };
  answerReviewEnabled: boolean;
  reviewItems?: QuestionReviewItem[] | null;
}

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params?.attemptId as string;

  const [data, setData] = useState<AttemptResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  useEffect(() => {
    if (!attemptId) return;

    async function loadResult() {
      try {
        const res = await fetch(`/api/exam/attempt/${attemptId}`);
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "Failed to load examination result.");
        }
        setData(json);

        // Confetti burst for successful completion
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FF9900", "#10B981", "#00A4E4", "#FFFFFF"],
          });
        } catch {
          // ignore confetti load error
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to load result.");
      } finally {
        setLoading(false);
      }
    }

    loadResult();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-10 h-10 border-4 border-aws-orange border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-aws-muted">Computing your examination scorecard...</p>
      </div>
    );
  }

  if (errorMsg || !data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
        <p className="text-rose-400 text-sm font-semibold">{errorMsg || "Result not found."}</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-lg bg-aws-card border border-aws-border text-xs text-white hover:bg-aws-cardHover"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const { attempt, answerReviewEnabled, reviewItems } = data;
  const incorrectCount = Math.max(
    0,
    attempt.answeredCount - attempt.score
  );
  const unansweredCount = Math.max(
    0,
    attempt.totalQuestions - attempt.answeredCount
  );

  const minsUsed = Math.floor(attempt.timeUsedSeconds / 60);
  const secsUsed = attempt.timeUsedSeconds % 60;

  // Performance tier badge styling
  let tierBadge = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (attempt.performanceTier === "Strong") {
    tierBadge = "bg-sky-500/15 text-sky-400 border-sky-500/30";
  } else if (attempt.performanceTier === "Good") {
    tierBadge = "bg-amber-500/15 text-amber-400 border-amber-500/30";
  } else if (attempt.performanceTier === "Needs Improvement") {
    tierBadge = "bg-rose-500/15 text-rose-400 border-rose-500/30";
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Examination Submitted Successfully</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Performance Scorecard
        </h1>
        <p className="text-xs sm:text-sm text-aws-muted">
          Participant: <strong className="text-white">{attempt.participantName}</strong> • AWS Cloud Practitioner CLF-C02 Mock Exam
        </p>
      </div>

      {/* Hero Scorecard */}
      <div className="bg-aws-card border border-aws-border rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-aws-muted block">
            Overall Score
          </span>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl sm:text-7xl font-black text-white tracking-tight">
              {attempt.score}
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-aws-subtle">
              / {attempt.totalQuestions}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-aws-orange">
            {attempt.percentage}%
          </div>
        </div>

        {/* Performance Tier Badge */}
        <div>
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border uppercase tracking-wider ${tierBadge}`}
          >
            Performance: {attempt.performanceTier}
          </span>
        </div>

        {/* Detailed KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-aws-border text-left">
          <div className="bg-aws-squid/80 border border-aws-border rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Correct
            </span>
            <span className="text-xl font-bold text-emerald-400">
              {attempt.score}
            </span>
          </div>

          <div className="bg-aws-squid/80 border border-aws-border rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Incorrect
            </span>
            <span className="text-xl font-bold text-rose-400">
              {incorrectCount}
            </span>
          </div>

          <div className="bg-aws-squid/80 border border-aws-border rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Unanswered
            </span>
            <span className="text-xl font-bold text-amber-400">
              {unansweredCount}
            </span>
          </div>

          <div className="bg-aws-squid/80 border border-aws-border rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Time Used
            </span>
            <span className="text-xl font-bold text-white font-mono">
              {minsUsed}m {secsUsed}s
            </span>
          </div>
        </div>
      </div>

      {/* Domain Breakdown */}
      <div className="bg-aws-card border border-aws-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-aws-orange" />
            <span>Performance by Knowledge Domain</span>
          </h2>
          <p className="text-xs text-aws-muted mt-0.5">
            CLF-C02 Domain Proficiency Breakdown
          </p>
        </div>

        <div className="space-y-4">
          {attempt.domainScores.map((domainStat) => (
            <div key={domainStat.domain} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-white">
                  {domainStat.domain}
                </span>
                <span className="text-aws-muted font-medium">
                  {domainStat.correct} / {domainStat.total} (
                  <strong className="text-aws-orange">{domainStat.percentage}%</strong>)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-aws-squid border border-aws-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-aws-orange to-amber-400 transition-all duration-500"
                  style={{ width: `${domainStat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Detailed Question Review */}
      {answerReviewEnabled && reviewItems ? (
        <div className="bg-aws-card border border-aws-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Full Question Review & Explanations</span>
            </h2>
            <p className="text-xs text-aws-muted mt-0.5">
              Review correct answers and rationale for all 65 questions
            </p>
          </div>

          <div className="space-y-3">
            {reviewItems.map((item) => {
              const isExpanded = expandedQuestion === item.id;
              return (
                <div
                  key={item.id}
                  className="border border-aws-border rounded-xl bg-aws-squid/60 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedQuestion(isExpanded ? null : item.id)
                    }
                    className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-aws-cardHover/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          item.isCorrect
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {item.id}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                        {item.question}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          item.isCorrect
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {item.isCorrect ? "Correct" : "Incorrect"}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-aws-muted" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-aws-muted" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 border-t border-aws-border bg-aws-squid space-y-4 text-xs">
                      <p className="text-white font-medium">{item.question}</p>

                      <div className="space-y-1.5">
                        {item.options.map((opt) => {
                          const isSelected = item.selectedAnswer.includes(opt.id);
                          const isCorrect = item.correctAnswer.includes(opt.id);

                          let style = "bg-aws-card border-aws-border text-aws-muted";
                          if (isCorrect) {
                            style = "bg-emerald-500/10 border-emerald-500/50 text-emerald-300 font-semibold";
                          } else if (isSelected && !isCorrect) {
                            style = "bg-rose-500/10 border-rose-500/50 text-rose-300";
                          }

                          return (
                            <div
                              key={opt.id}
                              className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${style}`}
                            >
                              <span>
                                <strong className="mr-1">{opt.id}.</strong> {opt.text}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-aws-card text-aws-muted">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 rounded-lg bg-aws-card border border-aws-border text-aws-muted text-[11px] leading-relaxed">
                        <strong className="text-aws-orange block mb-1">
                          Explanation:
                        </strong>
                        {item.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-aws-card/60 border border-aws-border rounded-xl p-5 text-center text-xs text-aws-muted space-y-1">
          <p className="font-semibold text-white">Answer Review Pending</p>
          <p className="text-aws-subtle">
            Detailed question explanations will become available once the workshop
            organizers publish the review phase.
          </p>
        </div>
      )}

      {/* Leaderboard Callout CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-aws-card to-aws-cardHover border border-aws-border">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-aws-orange" />
            <span>Event Leaderboard</span>
          </h3>
          <p className="text-xs text-aws-muted mt-0.5">
            View how your score compares across the workshop participants.
          </p>
        </div>

        <button
          onClick={() => router.push("/leaderboard")}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-black text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-aws-orange/10 flex-shrink-0"
        >
          <span>View Public Leaderboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
