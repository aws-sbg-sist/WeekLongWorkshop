"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Cloud,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Server,
  CreditCard,
  Layers,
  Sparkles,
  Calendar,
} from "lucide-react";

interface PublicInfo {
  config: {
    id: string;
    name: string;
    examTitle: string;
    institution: string;
    status: "upcoming" | "live" | "ended";
    startTime: string;
    endTime: string;
    durationMinutes: number;
    totalQuestions: number;
    expectedParticipants: number;
    leaderboardEnabled: boolean;
  };
  stats: {
    activeParticipants: number;
    completedSubmissions: number;
  };
}

export default function LandingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(true);
  const [info, setInfo] = useState<PublicInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    async function loadInfo() {
      try {
        const res = await fetch("/api/exam/public-info");
        const data = await res.json();
        if (data.success) {
          setInfo(data);
        }
      } catch (err) {
        console.error("Failed to load exam info", err);
      } finally {
        setInfoLoading(false);
      }
    }
    loadInfo();
  }, []);

  // Countdown timer calculation if status is upcoming
  useEffect(() => {
    if (!info?.config || info.config.status !== "upcoming") return;

    const interval = setInterval(() => {
      const target = new Date(info.config.startTime).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Starting shortly...");
        clearInterval(interval);
      } else {
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(
          `${hrs.toString().padStart(2, "0")}h ${mins
            .toString()
            .padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [info]);

  const handleEnterExam = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = name.trim().replace(/\s+/g, " ");
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg("Please enter your full name (at least 2 characters).");
      return;
    }

    setLoading(true);

    try {
      // Save name to session
      sessionStorage.setItem("participant_name", trimmedName);

      // Check with start API
      const res = await fetch("/api/exam/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Unable to enter examination.");
        setLoading(false);
        return;
      }

      if (data.alreadySubmitted) {
        sessionStorage.setItem("attempt_id", data.attemptId);
        router.push(`/exam/result/${data.attemptId}`);
        return;
      }

      sessionStorage.setItem("attempt_id", data.attemptId);

      if (data.isResume) {
        // Direct resume
        router.push("/exam");
      } else {
        // First time: go to pre-exam instructions
        router.push("/instructions");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  const status = info?.config?.status || "live";

  return (
    <div className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Event Header Banner */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-aws-card border border-aws-border text-aws-muted">
          <Sparkles className="w-3.5 h-3.5 text-aws-orange" />
          <span>AWS Cloud Practitioner Week Long Workshop</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          AWS Certified Cloud Practitioner
          <span className="block text-aws-orange mt-1">
            CLF-C02 Practice Mock Examination
          </span>
        </h1>

        <p className="text-sm sm:text-base text-aws-muted max-w-2xl mx-auto">
          Sathyabama Institute of Science and Technology, Chennai
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
          <div className="bg-aws-card/80 border border-aws-border rounded-xl p-3 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-white">65</span>
            <span className="text-[11px] font-medium text-aws-muted uppercase tracking-wider">
              Questions
            </span>
          </div>
          <div className="bg-aws-card/80 border border-aws-border rounded-xl p-3 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-aws-orange">
              90
            </span>
            <span className="text-[11px] font-medium text-aws-muted uppercase tracking-wider">
              Minutes
            </span>
          </div>
          <div className="bg-aws-card/80 border border-aws-border rounded-xl p-3 text-center">
            <span className="block text-xl sm:text-2xl font-bold text-emerald-400">
              Instant
            </span>
            <span className="text-[11px] font-medium text-aws-muted uppercase tracking-wider">
              Scorecard
            </span>
          </div>
        </div>
      </div>

      {/* Main Entry Card */}
      <div className="bg-aws-card border border-aws-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden max-w-xl mx-auto w-full">
        {/* Glow ambient accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-aws-orange/10 rounded-full blur-3xl pointer-events-none" />

        {/* Status indicator block */}
        <div className="mb-6 pb-6 border-b border-aws-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-3 h-3 rounded-full ${
                status === "live"
                  ? "bg-emerald-400 animate-ping"
                  : status === "upcoming"
                  ? "bg-amber-400"
                  : "bg-rose-500"
              }`}
            />
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-aws-muted block">
                Examination Status
              </span>
              <span className="text-sm font-bold text-white capitalize">
                {status === "live"
                  ? "Live Examination in Progress"
                  : status === "upcoming"
                  ? "Upcoming Examination"
                  : "Examination Concluded"}
              </span>
            </div>
          </div>

          {status === "upcoming" && countdown && (
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-aws-muted block">
                Starts In
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-amber-400">
                {countdown}
              </span>
            </div>
          )}
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <div>
              <p className="font-semibold">Notice</p>
              <p className="mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Form */}
        {status === "ended" ? (
          <div className="text-center py-6 space-y-4">
            <p className="text-sm text-aws-muted">
              The scheduled examination session has ended. You can view the final
              results on the public leaderboard.
            </p>
            <button
              onClick={() => router.push("/leaderboard")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-aws-orange text-black font-semibold text-sm hover:bg-aws-orangeHover transition-all shadow-lg"
            >
              <span>View Leaderboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleEnterExam} className="space-y-5">
            <div>
              <label
                htmlFor="participantName"
                className="block text-xs font-semibold uppercase tracking-wider text-aws-muted mb-2"
              >
                Participant Full Name
              </label>
              <input
                id="participantName"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arun Kumar"
                className="w-full px-4 py-3.5 rounded-xl bg-aws-squid border border-aws-border text-white placeholder:text-aws-subtle focus:outline-none focus:ring-2 focus:ring-aws-orange focus:border-aws-orange transition-all text-sm sm:text-base"
              />
              <p className="text-[11px] text-aws-subtle mt-1.5">
                Please enter your registered name as known to the workshop organizers.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || infoLoading}
              className="w-full py-4 px-6 rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-black font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-aws-orange/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span>Entering Examination...</span>
              ) : (
                <>
                  <span>Enter Examination</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Domain Syllabus Highlights */}
      <div className="mt-14 space-y-4">
        <h2 className="text-center text-xs font-bold uppercase tracking-widest text-aws-subtle">
          CLF-C02 Domain Breakdown (65 Questions)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-aws-card/60 border border-aws-border rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Domain 1: Cloud Concepts</h3>
              <p className="text-[11px] text-aws-muted mt-0.5">
                15 Questions • Global infra, agility, economies of scale, 6 Rs migration
              </p>
            </div>
          </div>

          <div className="bg-aws-card/60 border border-aws-border rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">
                Domain 2: Security & Compliance
              </h3>
              <p className="text-[11px] text-aws-muted mt-0.5">
                20 Questions • Shared responsibility, IAM, Shield, WAF, GuardDuty
              </p>
            </div>
          </div>

          <div className="bg-aws-card/60 border border-aws-border rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">
                Domain 3: Technology & Services
              </h3>
              <p className="text-[11px] text-aws-muted mt-0.5">
                22 Questions • EC2, Lambda, S3, EBS, RDS, VPC, Route 53, SQS
              </p>
            </div>
          </div>

          <div className="bg-aws-card/60 border border-aws-border rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">
                Domain 4: Billing & Support
              </h3>
              <p className="text-[11px] text-aws-muted mt-0.5">
                8 Questions • Pricing Calculator, Budgets, Cost Explorer, Spot, Trusted Advisor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
