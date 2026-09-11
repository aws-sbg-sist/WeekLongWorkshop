"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowLeft,
  User,
  ShieldAlert,
} from "lucide-react";

export default function InstructionsPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [attemptId, setAttemptId] = useState<string>("");
  const [agreed, setAgreed] = useState(false);
  const [examStatus, setExamStatus] = useState<string>("live");

  useEffect(() => {
    const savedName = sessionStorage.getItem("participant_name");
    const savedAttempt = sessionStorage.getItem("attempt_id");

    if (!savedName) {
      router.push("/");
      return;
    }

    setName(savedName);
    if (savedAttempt) {
      setAttemptId(savedAttempt);
    }

    // Check exam status
    async function checkStatus() {
      try {
        const res = await fetch(`/api/exam/public-info?_t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data?.config?.status) {
          setExamStatus(data.config.status);
        }
      } catch {}
    }
    checkStatus();
    const interval = setInterval(checkStatus, 6000);
    return () => clearInterval(interval);
  }, [router]);

  const handleStartExam = () => {
    router.push("/exam");
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Back button & Participant chip */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-1.5 text-xs text-aws-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Name</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-card border border-aws-border text-xs text-aws-muted">
          <User className="w-3.5 h-3.5 text-aws-orange" />
          <span>Candidate: <strong className="text-white">{name}</strong></span>
        </div>
      </div>

      {/* Main Instructions Card */}
      <div className="bg-aws-card border border-aws-border rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-aws-orange">
            Candidate Pre-Check & Instructions
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            AWS Certified Cloud Practitioner (CLF-C02)
          </h1>
          <p className="text-xs sm:text-sm text-aws-muted mt-1">
            AWS Cloud Practitioner Week Long Workshop • Sathyabama Institute of Science and Technology, Chennai
          </p>
        </div>

        {/* Spec Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-aws-border">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Total Questions
            </span>
            <span className="text-xl font-bold text-white">65 Items</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Time Allowed
            </span>
            <span className="text-xl font-bold text-aws-orange">90 Minutes</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Question Types
            </span>
            <span className="text-sm font-semibold text-white">
              Single & Multiple
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Evaluation
            </span>
            <span className="text-sm font-semibold text-emerald-400">
              Immediate
            </span>
          </div>
        </div>

        {/* Rules & Guidelines */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-aws-orange" />
            <span>Essential Examination Guidelines</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-aws-muted">
            <div className="p-3.5 rounded-xl bg-aws-squid border border-aws-border flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Navigation:</strong> You may move forward, backward, and jump to any question using the 65-item Question Navigator.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-aws-squid border border-aws-border flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Mark for Review:</strong> You can flag questions to re-examine before your final manual submission.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-aws-squid border border-aws-border flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Auto-Save:</strong> Your selections are saved continuously. In the event of an accidental refresh, your answers and remaining time are preserved.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-aws-squid border border-aws-border flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Countdown Timer:</strong> When the 90-minute timer expires, your exam will automatically submit with all answered questions.
              </span>
            </div>
          </div>
        </div>

        {/* Candidate agreement confirmation checkbox & CTA Button */}
        {examStatus === "ended" ? (
          <div className="pt-2 space-y-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm text-center">
              The examination session has concluded. New test attempts are no longer accepted.
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push("/leaderboard")}
                className="flex-1 py-3.5 px-6 rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-black font-bold text-sm transition-all shadow-lg text-center"
              >
                View Public Leaderboard
              </button>
              <button
                onClick={() => router.push("/")}
                className="py-3.5 px-6 rounded-xl bg-aws-card hover:bg-aws-cardHover border border-aws-border text-white font-semibold text-sm transition-all text-center"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : examStatus === "upcoming" ? (
          <div className="pt-2 space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm text-center">
              The examination is scheduled and has not started yet. Please wait for the workshop coordinator to begin the test.
            </div>
            <button
              disabled
              className="w-full py-4 px-6 rounded-xl bg-aws-card border border-aws-border text-aws-muted font-bold text-sm opacity-50 cursor-not-allowed text-center"
            >
              Waiting for Coordinator to Start Exam...
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-1 rounded border-aws-border bg-aws-squid text-aws-orange focus:ring-aws-orange focus:ring-offset-aws-dark"
                />
                <span className="text-xs text-aws-muted leading-relaxed">
                  I confirm that I am taking this practice mock examination on my own
                  device and agree to submit my responses within the allotted 90-minute
                  timeframe.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                onClick={handleStartExam}
                disabled={!agreed}
                className="w-full py-4 px-6 rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-black font-bold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-aws-orange/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed group"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Start Examination</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
