"use client";

import Link from "next/link";

interface DashboardHeaderProps {
  greeting: string;
  currentUser: any;
}

export default function DashboardHeader({
  greeting,
  currentUser,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          REAL-TIME AI POWERED CIVIC OPERATIONS
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          {greeting},{" "}
          {currentUser?.name?.split(" ")[0] || "Admin"} 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor complaints, AI insights and city operations from one place.
        </p>
      </div>

      <Link
        href="/complaints"
        className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        View Complaints
      </Link>
    </div>
  );
}