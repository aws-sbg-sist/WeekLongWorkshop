"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Cloud, Trophy, Shield, Activity } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isExamView = pathname.startsWith("/exam");
  const [examStatus, setExamStatus] = useState<string>("upcoming");

  useEffect(() => {
    // Inside exam view, the exam screen handles its own status check
    if (isExamView) return;

    async function fetchStatus() {
      try {
        const res = await fetch(`/api/exam/public-info?_t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data?.config?.status) {
          setExamStatus(data.config.status);
        }
      } catch (err) {
        // silently fallback
      }
    }
    fetchStatus();
    const interval = setInterval(fetchStatus, 8000);
    return () => clearInterval(interval);
  }, [isExamView]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-aws-border bg-aws-squid/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Event Details */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-aws-orange/15 border border-aws-orange/30 flex items-center justify-center text-aws-orange transition-all duration-200 group-hover:scale-105 group-hover:bg-aws-orange/20">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-aws-orange transition-colors">
                AWS Cloud Practitioner
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded bg-aws-border text-aws-muted border border-aws-border">
                CLF-C02
              </span>
            </div>
            <p className="text-[11px] text-aws-muted hidden md:block">
              Sathyabama Institute of Science and Technology, Chennai
            </p>
          </div>
        </Link>

        {/* Right side navigation & status */}
        {!isExamView && (
          <nav className="flex items-center gap-2 sm:gap-4">
            {/* Status indicator badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-aws-border bg-aws-card">
              <span
                className={`w-2 h-2 rounded-full ${
                  examStatus === "live"
                    ? "bg-emerald-400 animate-pulse"
                    : examStatus === "upcoming"
                    ? "bg-amber-400"
                    : "bg-rose-500"
                }`}
              />
              <span
                className={`uppercase text-[11px] tracking-wider font-semibold ${
                  examStatus === "live"
                    ? "text-emerald-400"
                    : examStatus === "upcoming"
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {examStatus === "live"
                  ? "LIVE EXAM"
                  : examStatus === "upcoming"
                  ? "UPCOMING"
                  : "EXAM ENDED"}
              </span>
            </div>

            <Link
              href="/leaderboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                pathname === "/leaderboard"
                  ? "bg-aws-card text-aws-orange border border-aws-border"
                  : "text-aws-muted hover:text-white hover:bg-aws-card/60"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </Link>

            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                pathname === "/admin"
                  ? "bg-aws-card text-aws-orange border border-aws-border"
                  : "text-aws-muted hover:text-white hover:bg-aws-card/60"
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </nav>
        )}

        {isExamView && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider bg-aws-orange/15 text-aws-orange border border-aws-orange/30">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Official Mock Session
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
