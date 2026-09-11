"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Medal,
  Clock,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Lock,
} from "lucide-react";
import { LeaderboardEntry } from "@/types/exam";

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [published, setPublished] = useState(false);
  const [message, setMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setPublished(data.published);
      if (data.published) {
        setLeaderboard(data.leaderboard || []);
      } else {
        setMessage(data.message || "The leaderboard has not been published yet.");
      }
    } catch (err) {
      setMessage("Unable to load leaderboard at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-aws-muted hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Examination</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-aws-orange" />
            <span>Mock Examination Leaderboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-aws-muted mt-1">
            AWS Cloud Practitioner Week Long Workshop • Sathyabama Institute of Science and Technology
          </p>
        </div>

        <button
          onClick={fetchLeaderboard}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-aws-card hover:bg-aws-cardHover border border-aws-border text-xs font-semibold text-aws-muted hover:text-white transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-3">
          <div className="w-8 h-8 border-3 border-aws-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-aws-muted">Loading leaderboard standings...</p>
        </div>
      ) : !published ? (
        /* Unpublished State Card */
        <div className="bg-aws-card border border-aws-border rounded-2xl p-8 sm:p-14 text-center max-w-lg mx-auto space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-lg font-bold text-white">
            Leaderboard Not Published Yet
          </h2>

          <p className="text-xs text-aws-muted leading-relaxed">
            The event administrator will publish the official workshop standings
            once all participants have concluded their examination session.
          </p>

          <button
            onClick={fetchLeaderboard}
            className="mt-2 px-4 py-2 rounded-xl bg-aws-squid hover:bg-aws-card border border-aws-border text-xs text-white transition-colors"
          >
            Check Again
          </button>
        </div>
      ) : leaderboard.length === 0 ? (
        /* Empty Submissions Card */
        <div className="bg-aws-card border border-aws-border rounded-2xl p-10 text-center text-xs text-aws-muted">
          No participant submissions have been recorded yet.
        </div>
      ) : (
        /* Published Leaderboard Display */
        <div className="space-y-8">
          {/* Top 3 Podium Highlights */}
          {topThree.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1st Place */}
              {topThree[0] && (
                <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/15 via-aws-card to-aws-card border-2 border-amber-400/50 rounded-2xl p-6 text-center space-y-3 shadow-xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-amber-400/20">
                    <Sparkles className="w-12 h-12" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/50 flex items-center justify-center mx-auto text-xl font-black">
                    🥇
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                      1st Place Winner
                    </span>
                    <h3 className="text-lg font-extrabold text-white mt-0.5 truncate">
                      {topThree[0].participantName}
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-aws-border/60">
                    <div className="text-2xl font-black text-white">
                      {topThree[0].score} <span className="text-xs text-aws-muted font-normal">/ 65</span>
                    </div>
                    <div className="text-xs font-bold text-amber-400">
                      {topThree[0].percentage}%
                    </div>
                    <div className="text-[11px] text-aws-subtle mt-1 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {Math.floor(topThree[0].timeUsedSeconds / 60)}m{" "}
                        {topThree[0].timeUsedSeconds % 60}s
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2nd Place */}
              {topThree[1] && (
                <div className="order-2 md:order-1 bg-aws-card border border-slate-400/40 rounded-2xl p-6 text-center space-y-3 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-slate-400/20 text-slate-300 border border-slate-400/40 flex items-center justify-center mx-auto text-lg font-black">
                    🥈
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                      2nd Place
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5 truncate">
                      {topThree[1].participantName}
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-aws-border">
                    <div className="text-xl font-bold text-white">
                      {topThree[1].score} <span className="text-xs text-aws-muted font-normal">/ 65</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-300">
                      {topThree[1].percentage}%
                    </div>
                    <div className="text-[11px] text-aws-subtle mt-1 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {Math.floor(topThree[1].timeUsedSeconds / 60)}m{" "}
                        {topThree[1].timeUsedSeconds % 60}s
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <div className="order-3 bg-aws-card border border-amber-700/40 rounded-2xl p-6 text-center space-y-3 shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-amber-700/20 text-amber-500 border border-amber-700/40 flex items-center justify-center mx-auto text-lg font-black">
                    🥉
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                      3rd Place
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5 truncate">
                      {topThree[2].participantName}
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-aws-border">
                    <div className="text-xl font-bold text-white">
                      {topThree[2].score} <span className="text-xs text-aws-muted font-normal">/ 65</span>
                    </div>
                    <div className="text-xs font-semibold text-amber-500">
                      {topThree[2].percentage}%
                    </div>
                    <div className="text-[11px] text-aws-subtle mt-1 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {Math.floor(topThree[2].timeUsedSeconds / 60)}m{" "}
                        {topThree[2].timeUsedSeconds % 60}s
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full Table */}
          <div className="bg-aws-card border border-aws-border rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-aws-border">
              <h2 className="text-sm font-bold text-white">
                All Ranked Submissions ({leaderboard.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-aws-squid/80 text-aws-muted uppercase tracking-wider text-[11px] border-b border-aws-border font-semibold">
                  <tr>
                    <th className="py-3.5 px-4 text-center w-16">Rank</th>
                    <th className="py-3.5 px-4">Participant Name</th>
                    <th className="py-3.5 px-4 text-center">Score</th>
                    <th className="py-3.5 px-4 text-center">Percentage</th>
                    <th className="py-3.5 px-4 text-center">Time Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-aws-border/60">
                  {leaderboard.map((entry) => {
                    const isTopThree = entry.rank <= 3;
                    return (
                      <tr
                        key={`${entry.rank}-${entry.participantName}`}
                        className={`hover:bg-aws-cardHover/50 transition-colors ${
                          entry.rank === 1
                            ? "bg-amber-500/5 font-semibold"
                            : ""
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-bold">
                          {entry.rank === 1 ? (
                            <span className="text-amber-400">🥇 1</span>
                          ) : entry.rank === 2 ? (
                            <span className="text-slate-300">🥈 2</span>
                          ) : entry.rank === 3 ? (
                            <span className="text-amber-500">🥉 3</span>
                          ) : (
                            <span className="text-aws-muted">{entry.rank}</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-white font-medium">
                          {entry.participantName}
                        </td>

                        <td className="py-3.5 px-4 text-center font-bold text-white">
                          {entry.score} / 65
                        </td>

                        <td className="py-3.5 px-4 text-center font-bold text-aws-orange">
                          {entry.percentage}%
                        </td>

                        <td className="py-3.5 px-4 text-center font-mono text-xs text-aws-muted">
                          {Math.floor(entry.timeUsedSeconds / 60)}m{" "}
                          {entry.timeUsedSeconds % 60}s
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
