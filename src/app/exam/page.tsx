"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  Grid,
  Send,
  AlertCircle,
  CheckCircle2,
  X,
  HelpCircle,
  Save,
} from "lucide-react";
import { ClientQuestion } from "@/types/exam";

export default function ExamScreen() {
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [attemptId, setAttemptId] = useState<string>("");
  const [participantName, setParticipantName] = useState<string>("");
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Participant answers: questionId -> array of option letters (e.g. ["A"] or ["B", "D"])
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(
    new Set([1])
  );

  // 90-minute countdown timer (in seconds)
  const [timeRemaining, setTimeRemaining] = useState<number>(90 * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Modals & Drawers
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>("");

  // 1. Initialize session and load questions
  useEffect(() => {
    async function initExam() {
      const storedName = sessionStorage.getItem("participant_name");
      if (!storedName) {
        router.push("/");
        return;
      }
      setParticipantName(storedName);

      try {
        // Fetch questions
        const qRes = await fetch("/api/exam/questions");
        const qData = await qRes.json();
        if (!qData.success || !qData.questions) {
          throw new Error("Unable to retrieve examination questions.");
        }
        setQuestions(qData.questions);

        // Fetch or resume attempt
        const startRes = await fetch("/api/exam/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: storedName }),
        });

        const startData = await startRes.json();
        if (!startRes.ok) {
          throw new Error(startData.error || "Failed to initialize exam session.");
        }

        if (startData.alreadySubmitted) {
          router.push(`/exam/result/${startData.attemptId}`);
          return;
        }

        const currentAttemptId = startData.attemptId;
        setAttemptId(currentAttemptId);
        sessionStorage.setItem("attempt_id", currentAttemptId);

        // Load saved answers from server or localStorage
        let initialAnswers: Record<number, string[]> = startData.savedAnswers || {};
        try {
          const localSaved = localStorage.getItem(`answers_${currentAttemptId}`);
          if (localSaved) {
            initialAnswers = { ...initialAnswers, ...JSON.parse(localSaved) };
          }
        } catch {
          // ignore localStorage read error
        }
        setAnswers(initialAnswers);

        // Restore marked questions if cached
        try {
          const localMarked = localStorage.getItem(`marked_${currentAttemptId}`);
          if (localMarked) {
            setMarkedForReview(new Set(JSON.parse(localMarked)));
          }
        } catch {}

        // Restore remaining seconds
        const serverRemaining = startData.timeRemainingSeconds ?? 90 * 60;
        setTimeRemaining(serverRemaining);

        setLoading(false);
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to initialize exam.");
        setLoading(false);
      }
    }

    initExam();
  }, [router]);

  // 2. Continuous 90-minute countdown
  useEffect(() => {
    if (loading || timeRemaining <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, timeRemaining]);

  // 3. Beforeunload protection against accidental exit
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Your exam is currently in progress. Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // 4. Autosave progress to server & localStorage
  const saveProgressToServer = useCallback(
    async (currentAnswers: Record<number, string[]>) => {
      if (!attemptId) return;

      try {
        localStorage.setItem(
          `answers_${attemptId}`,
          JSON.stringify(currentAnswers)
        );
        await fetch("/api/exam/save-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ attemptId, answers: currentAnswers }),
        });
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      } catch (err) {
        // Silently fail network sync, localStorage preserves it
      }
    },
    [attemptId]
  );

  // Debounced autosave whenever answers change
  useEffect(() => {
    if (!attemptId || loading) return;
    const timer = setTimeout(() => {
      saveProgressToServer(answers);
    }, 800);
    return () => clearTimeout(timer);
  }, [answers, attemptId, loading, saveProgressToServer]);

  // Save marked list to localStorage
  useEffect(() => {
    if (!attemptId) return;
    try {
      localStorage.setItem(
        `marked_${attemptId}`,
        JSON.stringify(Array.from(markedForReview))
      );
    } catch {}
  }, [markedForReview, attemptId]);

  // Track visited questions
  useEffect(() => {
    if (questions.length === 0) return;
    const currentQ = questions[currentIndex];
    if (currentQ) {
      setVisitedQuestions((prev) => new Set(prev).add(currentQ.id));
    }
  }, [currentIndex, questions]);

  // Question navigation handlers
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsSubmitModalOpen(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setIsNavigatorOpen(false);
  };

  const toggleMarkForReview = (questionId: number) => {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  // Option selection logic
  const handleSelectOption = (optionId: string) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const currentSelected = answers[currentQ.id] || [];

    if (currentQ.questionType === "single") {
      // Single choice
      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: [optionId],
      }));
    } else {
      // Multiple response
      const maxCount = currentQ.multipleResponseCount || 2;
      let updated: string[];

      if (currentSelected.includes(optionId)) {
        updated = currentSelected.filter((id) => id !== optionId);
      } else {
        if (currentSelected.length >= maxCount) {
          // Replace earliest or restrict
          updated = [...currentSelected.slice(1), optionId];
        } else {
          updated = [...currentSelected, optionId];
        }
      }

      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: updated,
      }));
    }
  };

  // Submission handler
  const handleFinalSubmit = async (isAuto = false) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      // Clear beforeunload handler
      window.onbeforeunload = null;

      const res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attemptId, answers, isAuto }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      // Cleanup local cache
      try {
        localStorage.removeItem(`answers_${attemptId}`);
        localStorage.removeItem(`marked_${attemptId}`);
      } catch {}

      router.push(`/exam/result/${attemptId}`);
    } catch (err: any) {
      alert(`Error submitting exam: ${err.message}`);
      setSubmitting(false);
    }
  };

  const handleAutoSubmit = () => {
    handleFinalSubmit(true);
  };

  // Format seconds into MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Derived metrics
  const currentQ = questions[currentIndex];
  const totalCount = questions.length || 65;
  const answeredCount = Object.keys(answers).filter(
    (k) => (answers[Number(k)] || []).length > 0
  ).length;
  const unansweredCount = totalCount - answeredCount;
  const markedCount = markedForReview.size;

  // Timer color progression
  const isTimeCritical = timeRemaining < 300; // < 5 mins
  const isTimeWarning = timeRemaining < 900 && !isTimeCritical; // < 15 mins

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 border-4 border-aws-orange border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-aws-muted animate-pulse">
          Setting up your 65-question CLF-C02 examination environment...
        </p>
      </div>
    );
  }

  if (errorMsg || !currentQ) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
        <div className="p-3 rounded-full bg-rose-500/10 text-rose-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-white">Examination Notice</h2>
        <p className="text-xs text-aws-muted">{errorMsg || "Question data not available."}</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-lg bg-aws-card border border-aws-border text-xs text-white hover:bg-aws-cardHover"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const isCurrentMarked = markedForReview.has(currentQ.id);
  const selectedForCurrent = answers[currentQ.id] || [];

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-aws-dark select-none">
      {/* ---------------------------------------------------- */}
      {/* TOP EXAMINATION BAR */}
      {/* ---------------------------------------------------- */}
      <div className="border-b border-aws-border bg-aws-squid/95 sticky top-16 z-30 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Question Indicator & Review Toggle */}
          <div className="flex items-center gap-3">
            <div className="text-xs sm:text-sm font-bold text-white">
              Question <span className="text-aws-orange text-base sm:text-lg">{currentIndex + 1}</span> / {totalCount}
            </div>

            <button
              onClick={() => toggleMarkForReview(currentQ.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isCurrentMarked
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-aws-card text-aws-muted border-aws-border hover:text-white hover:bg-aws-cardHover"
              }`}
              title="Mark this question to review before final submission"
            >
              <Flag
                className={`w-3.5 h-3.5 ${
                  isCurrentMarked ? "fill-amber-400 text-amber-400" : ""
                }`}
              />
              <span className="hidden sm:inline">
                {isCurrentMarked ? "Marked for Review" : "Mark for Review"}
              </span>
            </button>
          </div>

          {/* Center: Live Autosave status */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-aws-subtle">
            <Save className="w-3 h-3 text-emerald-400" />
            <span>Answers saved</span>
          </div>

          {/* Right: Timer & Submit CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Timer Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-sm sm:text-base border transition-all ${
                isTimeCritical
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse-fast"
                  : isTimeWarning
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-aws-card border-aws-border text-emerald-400"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            {/* Quick Submit Button */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-aws-orange/15 hover:bg-aws-orange/25 border border-aws-orange/30 text-aws-orange hover:text-white text-xs font-bold transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MAIN QUESTION DISPLAY AREA */}
      {/* ---------------------------------------------------- */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Question Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-aws-card border border-aws-border text-aws-muted font-medium">
                {currentQ.domain}
              </span>
              <span className="text-aws-subtle hidden sm:inline">•</span>
              <span className="text-aws-subtle hidden sm:inline">{currentQ.topic}</span>
            </div>

            {/* Type indicator */}
            <span
              className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-wide uppercase ${
                currentQ.questionType === "multiple"
                  ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                  : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
              }`}
            >
              {currentQ.questionType === "multiple"
                ? `Select ${currentQ.multipleResponseCount || 2} Answers`
                : "Select Single Answer"}
            </span>
          </div>

          {/* Question Stem */}
          <div className="bg-aws-card border border-aws-border rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Option Choices List */}
          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedForCurrent.includes(option.id);

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-150 flex items-start gap-4 group ${
                    isSelected
                      ? "bg-aws-orange/10 border-aws-orange shadow-md shadow-aws-orange/5 text-white"
                      : "bg-aws-card/70 border-aws-border hover:bg-aws-cardHover hover:border-aws-borderSubtle text-aws-muted hover:text-white"
                  }`}
                >
                  {/* Option Badge / Indicator */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-aws-orange text-black font-extrabold"
                        : "bg-aws-squid border border-aws-border text-aws-muted group-hover:text-white group-hover:border-aws-orange/50"
                    }`}
                  >
                    {option.id}
                  </div>

                  {/* Option Text */}
                  <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                    {option.text}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* BOTTOM NAVIGATION TOOLBAR */}
        {/* ---------------------------------------------------- */}
        <div className="pt-8 mt-6 border-t border-aws-border flex items-center justify-between gap-3">
          {/* Previous button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-aws-card border border-aws-border text-xs sm:text-sm font-semibold text-aws-muted hover:text-white hover:bg-aws-cardHover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Question Navigator Drawer Trigger */}
          <button
            onClick={() => setIsNavigatorOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-aws-card border border-aws-border text-xs sm:text-sm font-semibold text-aws-text hover:text-aws-orange hover:border-aws-orange/40 transition-colors"
          >
            <Grid className="w-4 h-4 text-aws-orange" />
            <span>Question Navigator</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-aws-squid border border-aws-border">
              {answeredCount}/{totalCount}
            </span>
          </button>

          {/* Next / Review button */}
          {currentIndex < totalCount - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-black font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-aws-orange/10"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-emerald-500/20"
            >
              <span>Review & Submit</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* QUESTION NAVIGATOR DRAWER / MODAL */}
      {/* ---------------------------------------------------- */}
      {isNavigatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-aws-squid border border-aws-border rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-aws-border flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Grid className="w-4 h-4 text-aws-orange" />
                  <span>Question Navigator (65 Items)</span>
                </h3>
                <p className="text-xs text-aws-muted mt-0.5">
                  Answered: <strong className="text-white">{answeredCount}</strong> | Unanswered: <strong className="text-amber-400">{unansweredCount}</strong> | Marked: <strong className="text-amber-300">{markedCount}</strong>
                </p>
              </div>

              <button
                onClick={() => setIsNavigatorOpen(false)}
                className="p-1.5 rounded-lg text-aws-muted hover:text-white hover:bg-aws-card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid 1 to 65 */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-13 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered =
                    Array.isArray(answers[q.id]) && answers[q.id].length > 0;
                  const isMarked = markedForReview.has(q.id);
                  const isVisited = visitedQuestions.has(q.id);

                  let cellStyle = "bg-aws-card border-aws-border text-aws-muted";

                  if (isCurrent) {
                    cellStyle =
                      "bg-aws-orange text-black font-extrabold ring-2 ring-aws-orange ring-offset-2 ring-offset-aws-squid scale-105 z-10";
                  } else if (isAnswered && isMarked) {
                    cellStyle = "bg-amber-500/25 border-amber-500 text-amber-300 font-bold";
                  } else if (isAnswered) {
                    cellStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold";
                  } else if (isMarked) {
                    cellStyle = "bg-aws-card border-amber-500 text-amber-400 font-semibold";
                  } else if (isVisited) {
                    cellStyle = "bg-aws-card text-aws-subtle border-aws-borderSubtle";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={`h-9 rounded-lg flex items-center justify-center text-xs transition-all relative group border ${cellStyle}`}
                    >
                      <span>{q.id}</span>
                      {isMarked && !isCurrent && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-aws-squid" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-aws-border bg-aws-card/50 flex flex-wrap items-center justify-between gap-3 text-[11px] text-aws-muted">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-aws-orange" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/50" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-aws-card border border-amber-500" />
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500/25 border border-amber-500" />
                <span>Answered + Marked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-aws-card border border-aws-border" />
                <span>Not Answered</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* FINAL SUBMISSION CONFIRMATION MODAL */}
      {/* ---------------------------------------------------- */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-aws-squid border border-aws-border rounded-2xl w-full max-w-md p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <h3 className="text-lg font-bold text-white">
                Submit Your Examination?
              </h3>
              <p className="text-xs text-aws-muted mt-1">
                Please review your progress before submitting. Once submitted, your answers cannot be altered.
              </p>
            </div>

            {/* Progress Checklist */}
            <div className="bg-aws-card border border-aws-border rounded-xl p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-aws-muted">Total Questions:</span>
                <span className="font-bold text-white">{totalCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-aws-muted">Answered:</span>
                <span className="font-bold text-emerald-400">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-aws-muted">Unanswered:</span>
                <span
                  className={`font-bold ${
                    unansweredCount > 0 ? "text-amber-400" : "text-white"
                  }`}
                >
                  {unansweredCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-aws-muted">Marked for Review:</span>
                <span className="font-bold text-amber-300">{markedCount}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-aws-border">
                <span className="text-aws-muted">Time Remaining:</span>
                <span className="font-mono font-bold text-white">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>

            {/* Unanswered warning */}
            {unansweredCount > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
                <span>
                  You have <strong>{unansweredCount} unanswered</strong> question(s). Are you sure you wish to submit now?
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                disabled={submitting}
                className="flex-1 py-3 px-4 rounded-xl bg-aws-card hover:bg-aws-cardHover border border-aws-border text-white text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50"
              >
                Continue Exam
              </button>

              <button
                type="button"
                onClick={() => handleFinalSubmit(false)}
                disabled={submitting}
                className="flex-1 py-3 px-4 rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-black text-xs sm:text-sm font-bold transition-all shadow-lg shadow-aws-orange/20 disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {submitting ? "Submitting..." : "Submit Examination"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
