"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] p-10 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">

        <h1 className="text-4xl font-bold text-cyan-400">
          My Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your CivicAI account information.
        </p>

        {!user ? (
          <div className="mt-10 text-center text-slate-400">
            Loading profile...
          </div>
        ) : (
          <div className="mt-8 space-y-6">

            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500 text-3xl font-bold text-slate-950">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
                <p className="text-sm text-slate-400">
                  Full Name
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {user.name}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
                <p className="text-sm text-slate-400">
                  Email Address
                </p>

                <p className="mt-2 text-lg font-semibold">
                  {user.email}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
                <p className="text-sm text-slate-400">
                  Role
                </p>

                <p className="mt-2 text-lg font-semibold text-emerald-400">
                  Administrator
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
                <p className="text-sm text-slate-400">
                  Account Status
                </p>

                <p className="mt-2 text-lg font-semibold text-green-400">
                  Active
                </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}