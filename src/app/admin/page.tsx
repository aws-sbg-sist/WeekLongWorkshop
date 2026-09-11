"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Shield,
  KeyRound,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  Download,
  RotateCcw,
  RefreshCw,
  Search,
  UserPlus,
  Play,
  Pause,
  Eye,
  EyeOff,
  AlertTriangle,
  Lock,
} from "lucide-react";

interface AdminOverview {
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
    resultsEnabled: boolean;
    answerReviewEnabled: boolean;
  };
  kpis: {
    expectedParticipants: number;
    currentParticipantsCount: number;
    inProgressCount: number;
    submittedCount: number;
    notStartedCount: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    completionPercentage: number;
  };
}

interface ParticipantRow {
  id: string;
  name: string;
  registeredAt: string;
  attemptId: string | null;
  status: "not_started" | "in_progress" | "submitted" | "auto_submitted";
  score: number | null;
  percentage: number | null;
  timeUsedSeconds: number | null;
  startedAt: string | null;
  submittedAt: string | null;
  answeredCount: number;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Overview & participants state
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filters & search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Auto-refresh state
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Modals & form states
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResult, setBulkResult] = useState("");

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  // Check saved session on mount
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Incorrect admin password.");
      }

      sessionStorage.setItem("admin_token", data.token || "admin_authorized");
      setAuthenticated(true);
    } catch (err: any) {
      setLoginError(err.message || "Authentication failed.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setAuthenticated(false);
  };

  // Fetch dashboard overview and participants
  const fetchData = useCallback(async () => {
    if (!authenticated) return;
    setLoadingData(true);

    try {
      const token = sessionStorage.getItem("admin_token") || "";

      // 1. Overview
      const overviewRes = await fetch("/api/admin/overview", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (overviewRes.status === 401) {
        handleLogout();
        return;
      }
      const overviewJson = await overviewRes.json();
      if (overviewJson.success) {
        setOverview(overviewJson);
      }

      // 2. Participants
      const qParams = new URLSearchParams({
        search,
        status: statusFilter,
        sortBy,
        sortOrder,
      });

      const partRes = await fetch(`/api/admin/participants?${qParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const partJson = await partRes.json();
      if (partJson.success) {
        setParticipants(partJson.participants || []);
      }
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoadingData(false);
    }
  }, [authenticated, search, statusFilter, sortBy, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto polling
  useEffect(() => {
    if (!authenticated || !autoRefresh) return;
    const interval = setInterval(fetchData, 6000);
    return () => clearInterval(interval);
  }, [authenticated, autoRefresh, fetchData]);

  // Quick Action Toggles
  const handleUpdateExam = async (updates: Record<string, any>) => {
    const token = sessionStorage.getItem("admin_token") || "";

    // Optimistically update UI immediately
    setOverview((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        config: {
          ...prev.config,
          ...updates,
        },
      };
    });

    try {
      const res = await fetch("/api/admin/control", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert(`Failed: ${data.error}`);
        fetchData();
      }
    } catch (err: any) {
      alert(`Network error: ${err.message}`);
      fetchData();
    }
  };


  // Bulk import participants
  const handleBulkImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setBulkResult("");
    const names = bulkText
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 1);

    if (names.length === 0) {
      setBulkResult("Please enter at least one participant name.");
      return;
    }

    setBulkLoading(true);
    const token = sessionStorage.getItem("admin_token") || "";

    try {
      const res = await fetch("/api/admin/participants/pre-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ names }),
      });
      const data = await res.json();
      if (data.success) {
        setBulkResult(data.message);
        setBulkText("");
        fetchData();
      } else {
        setBulkResult(`Failed: ${data.error}`);
      }
    } catch (err: any) {
      setBulkResult(`Network error: ${err.message}`);
    } finally {
      setBulkLoading(false);
    }
  };

  // Reset exam
  const handleResetExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetConfirmText !== "RESET_EXAM_CONFIRMED") {
      alert("Please type 'RESET_EXAM_CONFIRMED' exactly as shown.");
      return;
    }

    setResetLoading(true);
    const token = sessionStorage.getItem("admin_token") || "";

    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ confirmation: resetConfirmText }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Examination data successfully reset.");
        setIsResetOpen(false);
        setResetConfirmText("");
        fetchData();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Network error: ${err.message}`);
    } finally {
      setResetLoading(false);
    }
  };

  // Export CSV
  const handleExportCSV = async () => {
    const token = sessionStorage.getItem("admin_token") || "";
    window.open(`/api/admin/export?token=${token}`, "_blank");
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!authenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="bg-aws-card border border-aws-border rounded-2xl p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-aws-orange/15 border border-aws-orange/30 text-aws-orange flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Administrator Portal
            </h1>
            <p className="text-xs text-aws-muted">
              AWS Cloud Practitioner Week Long Workshop • Sathyabama Institute of Science and Technology
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="adminPass"
                className="block text-xs font-semibold uppercase tracking-wider text-aws-muted mb-1.5"
              >
                Access Password
              </label>
              <input
                id="adminPass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-aws-squid border border-aws-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-aws-orange"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-black font-bold text-sm transition-all shadow-lg shadow-aws-orange/15 disabled:opacity-50"
            >
              {loginLoading ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-aws-subtle hover:text-aws-muted transition-colors"
            >
              Return to Candidate View
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // ----------------------------------------------------
  const kpis = overview?.kpis;
  const config = overview?.config;

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-aws-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-aws-orange/15 text-aws-orange border border-aws-orange/30">
              Coordinator Suite
            </span>
            <span className="text-xs text-aws-subtle">• Sathyabama Institute</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Exam Control & Live Monitoring
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Polling toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              autoRefresh
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-aws-card text-aws-muted border-aws-border"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? "animate-spin" : ""}`} />
            <span>{autoRefresh ? "Live Sync (6s)" : "Paused"}</span>
          </button>

          {/* Bulk Import */}
          <button
            onClick={() => setIsBulkOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-aws-card hover:bg-aws-cardHover border border-aws-border text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-aws-orange" />
            <span>Bulk Import</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-lg bg-aws-card hover:bg-aws-cardHover border border-aws-border text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Export CSV</span>
          </button>

          {/* Reset Exam */}
          <button
            onClick={() => setIsResetOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-semibold text-rose-300 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-aws-squid hover:bg-aws-card border border-aws-border text-xs text-aws-muted hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      {kpis && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="bg-aws-card border border-aws-border rounded-xl p-4">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Participants
            </span>
            <div className="text-2xl font-bold text-white mt-1">
              {kpis.currentParticipantsCount}{" "}
              <span className="text-xs text-aws-subtle font-normal">
                / {kpis.expectedParticipants}
              </span>
            </div>
          </div>

          <div className="bg-aws-card border border-aws-border rounded-xl p-4">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              In Progress
            </span>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              {kpis.inProgressCount}
            </div>
          </div>

          <div className="bg-aws-card border border-aws-border rounded-xl p-4">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Submitted
            </span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">
              {kpis.submittedCount}
            </div>
          </div>

          <div className="bg-aws-card border border-aws-border rounded-xl p-4">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Average Score
            </span>
            <div className="text-2xl font-bold text-aws-orange mt-1">
              {kpis.averageScore} <span className="text-xs text-aws-muted">/ 65</span>
            </div>
          </div>

          <div className="bg-aws-card border border-aws-border rounded-xl p-4">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Highest Score
            </span>
            <div className="text-2xl font-bold text-white mt-1">
              {kpis.highestScore} <span className="text-xs text-aws-muted">/ 65</span>
            </div>
          </div>

          <div className="bg-aws-card border border-aws-border rounded-xl p-4">
            <span className="text-[11px] font-semibold text-aws-muted uppercase tracking-wider block">
              Completion Rate
            </span>
            <div className="text-2xl font-bold text-sky-400 mt-1">
              {kpis.completionPercentage}%
            </div>
          </div>
        </div>
      )}

      {/* Quick Controls Section */}
      {config && (
        <div className="bg-aws-card border border-aws-border rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Live Exam Configuration & State Toggles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Selector */}
            <div className="p-4 rounded-xl bg-aws-squid border border-aws-border space-y-2">
              <span className="text-xs font-semibold text-aws-muted uppercase tracking-wider block">
                Exam State
              </span>
              <div className="grid grid-cols-3 gap-1">
                {(["upcoming", "live", "ended"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateExam({ status: st })}
                    className={`py-1.5 text-xs font-bold capitalize rounded-lg transition-colors ${
                      config.status === st
                        ? st === "live"
                          ? "bg-emerald-500 text-black"
                          : st === "upcoming"
                          ? "bg-amber-400 text-black"
                          : "bg-rose-500 text-white"
                        : "bg-aws-card text-aws-muted hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Leaderboard Publishing */}
            <div className="p-4 rounded-xl bg-aws-squid border border-aws-border flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-aws-muted uppercase tracking-wider block">
                  Leaderboard
                </span>
                <span className="text-xs font-bold text-white">
                  {config.leaderboardEnabled ? "Published to Public" : "Hidden"}
                </span>
              </div>
              <button
                onClick={() =>
                  handleUpdateExam({
                    leaderboardEnabled: !config.leaderboardEnabled,
                  })
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  config.leaderboardEnabled
                    ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                    : "bg-aws-orange text-black hover:bg-aws-orangeHover"
                }`}
              >
                {config.leaderboardEnabled ? "Unpublish" : "Publish"}
              </button>
            </div>

            {/* Answer Explanations */}
            <div className="p-4 rounded-xl bg-aws-squid border border-aws-border flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-aws-muted uppercase tracking-wider block">
                  Answer Explanations
                </span>
                <span className="text-xs font-bold text-white">
                  {config.answerReviewEnabled ? "Enabled" : "Locked"}
                </span>
              </div>
              <button
                onClick={() =>
                  handleUpdateExam({
                    answerReviewEnabled: !config.answerReviewEnabled,
                  })
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  config.answerReviewEnabled
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-aws-card border border-aws-border text-aws-muted hover:text-white"
                }`}
              >
                {config.answerReviewEnabled ? "Disable" : "Enable"}
              </button>
            </div>

            {/* Duration Setting */}
            <div className="p-4 rounded-xl bg-aws-squid border border-aws-border flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-aws-muted uppercase tracking-wider block">
                  Time Allowed
                </span>
                <span className="text-xs font-bold text-white">
                  {config.durationMinutes} Minutes (CLF-C02)
                </span>
              </div>
              <span className="text-xs font-bold text-aws-orange">65 Items</span>
            </div>
          </div>
        </div>
      )}

      {/* Participants Live Monitor Table */}
      <div className="bg-aws-card border border-aws-border rounded-2xl overflow-hidden shadow-xl space-y-4 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">
              Participant Activity Monitor
            </h2>
            <p className="text-xs text-aws-muted mt-0.5">
              Showing {participants.length} registered candidate records
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-aws-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidate..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-aws-squid border border-aws-border text-white placeholder:text-aws-subtle focus:outline-none focus:border-aws-orange w-44 sm:w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 text-xs rounded-xl bg-aws-squid border border-aws-border text-white focus:outline-none focus:border-aws-orange"
            >
              <option value="all">All Statuses</option>
              <option value="in_progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="auto_submitted">Auto Submitted</option>
              <option value="not_started">Not Started</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1.5 px-3 text-xs rounded-xl bg-aws-squid border border-aws-border text-white focus:outline-none focus:border-aws-orange"
            >
              <option value="name">Sort by Name</option>
              <option value="score">Sort by Score</option>
              <option value="time">Sort by Duration</option>
              <option value="submittedAt">Sort by Submission</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-2.5 py-1.5 rounded-xl bg-aws-squid border border-aws-border text-xs text-aws-muted hover:text-white"
            >
              {sortOrder.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-aws-border rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-aws-squid text-aws-muted uppercase tracking-wider text-[11px] border-b border-aws-border font-semibold">
              <tr>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Answered</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-center">Percentage</th>
                <th className="py-3 px-4 text-center">Time Used</th>
                <th className="py-3 px-4 text-center">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-aws-border/60">
              {participants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-aws-subtle">
                    No matching participants found.
                  </td>
                </tr>
              ) : (
                participants.map((p) => {
                  let statusBadge = "bg-aws-card text-aws-subtle border-aws-border";
                  if (p.status === "in_progress") {
                    statusBadge = "bg-amber-500/15 text-amber-300 border-amber-500/30";
                  } else if (p.status === "submitted") {
                    statusBadge = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
                  } else if (p.status === "auto_submitted") {
                    statusBadge = "bg-purple-500/15 text-purple-300 border-purple-500/30";
                  }

                  const timeUsed = p.timeUsedSeconds
                    ? `${Math.floor(p.timeUsedSeconds / 60)}m ${
                        p.timeUsedSeconds % 60
                      }s`
                    : "—";

                  const submittedAtFormatted = p.submittedAt
                    ? new Date(p.submittedAt).toLocaleTimeString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "—";

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-aws-cardHover/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-white">
                        {p.name}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusBadge}`}
                        >
                          {p.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center text-aws-muted">
                        {p.answeredCount} / 65
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-white">
                        {p.score !== null ? `${p.score} / 65` : "—"}
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-aws-orange">
                        {p.percentage !== null ? `${p.percentage}%` : "—"}
                      </td>

                      <td className="py-3 px-4 text-center font-mono text-aws-muted">
                        {timeUsed}
                      </td>

                      <td className="py-3 px-4 text-center text-aws-subtle">
                        {submittedAtFormatted}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* BULK IMPORT MODAL */}
      {/* ---------------------------------------------------- */}
      {isBulkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-aws-squid border border-aws-border rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-aws-orange" />
              <span>Bulk Import Participant Names</span>
            </h3>
            <p className="text-xs text-aws-muted">
              Paste participant names below (one name per line). These will be pre-registered in the examination roster.
            </p>

            {bulkResult && (
              <div className="p-3 rounded-xl bg-aws-card border border-aws-border text-xs text-aws-orange">
                {bulkResult}
              </div>
            )}

            <textarea
              rows={8}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Arun Kumar&#10;Priya S&#10;Rahul M&#10;Karthik R"
              className="w-full p-3 text-xs font-mono rounded-xl bg-aws-card border border-aws-border text-white focus:outline-none focus:border-aws-orange"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsBulkOpen(false)}
                className="px-4 py-2 text-xs rounded-xl bg-aws-card text-aws-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                disabled={bulkLoading}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-aws-orange hover:bg-aws-orangeHover text-black disabled:opacity-50"
              >
                {bulkLoading ? "Importing..." : "Import Participants"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* RESET EXAM CONFIRMATION MODAL */}
      {/* ---------------------------------------------------- */}
      {isResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-aws-squid border border-rose-500/50 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">
                Reset All Examination Data?
              </h3>
            </div>

            <p className="text-xs text-aws-muted leading-relaxed">
              This action will permanently delete all current candidate attempts, answers, and scores. This is intended for clearing test runs before the real workshop exam starts.
            </p>

            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-semibold text-aws-muted block">
                Type <strong className="text-rose-400">RESET_EXAM_CONFIRMED</strong> to proceed:
              </label>
              <input
                type="text"
                value={resetConfirmText}
                onChange={(e) => setResetConfirmText(e.target.value)}
                placeholder="RESET_EXAM_CONFIRMED"
                className="w-full p-2.5 text-xs rounded-xl bg-aws-card border border-aws-border text-white focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsResetOpen(false);
                  setResetConfirmText("");
                }}
                className="px-4 py-2 text-xs rounded-xl bg-aws-card text-aws-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetExam}
                disabled={resetLoading || resetConfirmText !== "RESET_EXAM_CONFIRMED"}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40"
              >
                {resetLoading ? "Resetting..." : "Permanently Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
