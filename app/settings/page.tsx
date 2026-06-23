"use client";
import { motion } from "framer-motion";
export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          CivicAI
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Settings Center
        </h1>
        <motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4"
>

  <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
    <p className="text-sm text-slate-400">
      Active Users
    </p>

    <h2 className="mt-4 text-5xl font-black text-cyan-400">
      128
    </h2>
  </div>

  <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]">
    <p className="text-sm text-slate-400">
      System Health
    </p>

    <h2 className="mt-4 text-5xl font-black text-emerald-400">
      99%
    </h2>
  </div>

  <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,146,60,0.15)]">
    <p className="text-sm text-slate-400">
      Security Score
    </p>

    <h2 className="mt-4 text-5xl font-black text-orange-400">
      A+
    </h2>
  </div>

  <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
    <p className="text-sm text-slate-400">
      AI Status
    </p>

    <h2 className="mt-4 text-5xl font-black text-purple-400">
      ON
    </h2>
  </div>

</motion.section>

        <p className="mt-4 max-w-3xl text-lg text-slate-400">
          Configure platform preferences, notifications, AI settings and security.
        </p>

        <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">

          <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
>
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            <p className="mt-2 text-slate-400">
              Manage administrator account information.
            </p>
          </motion.div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="mt-2 text-slate-400">
              Configure alerts and complaint updates.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
            <h2 className="text-xl font-semibold">AI Configuration</h2>
            <p className="mt-2 text-slate-400">
              Manage prediction and recommendation settings.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="mt-2 text-slate-400">
              Access control, permissions and audit logs.
            </p>
          </div>

        </section>
        <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-12"
>

  <h2 className="text-3xl font-bold text-white">
    System Status
  </h2>

  <div className="mt-6 grid gap-4 md:grid-cols-3">

    <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.20)]">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>

        <span className="font-semibold text-emerald-400">
          AI Engine Online
        </span>
      </div>
    </div>

    <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.20)]">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse"></div>

        <span className="font-semibold text-cyan-400">
          Database Healthy
        </span>
      </div>
    </div>

    <div className="rounded-2xl border border-orange-500/20 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(251,146,60,0.20)]">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-orange-400 animate-pulse"></div>

        <span className="font-semibold text-orange-400">
          API Services Running
        </span>
      </div>
    </div>

  </div>

</motion.section>
      </div>
    </main>
  );
}