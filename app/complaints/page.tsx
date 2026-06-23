"use client";
import { motion } from "framer-motion";
export default function ComplaintsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          CivicAI Dashboard
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Complaints Management
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-400">
          Search, filter and monitor every civic complaint from one intelligent
          control center.
        </p>
        <motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-10 grid gap-6 md:grid-cols-3"
>

  <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.20)]">
    <p className="text-sm text-slate-400">Total Complaints</p>
    <h2 className="mt-3 text-5xl font-bold text-cyan-400">1,248</h2>
    <p className="mt-3 text-emerald-400">+8% this week</p>
  </div>

  <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.20)]">
    <p className="text-sm text-slate-400">Resolved</p>
    <h2 className="mt-3 text-5xl font-bold text-emerald-400">932</h2>
    <p className="mt-3 text-cyan-400">75% completion</p>
  </div>

  <div className="rounded-3xl border border-orange-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,146,60,0.20)]">
    <p className="text-sm text-slate-400">Critical Cases</p>
    <h2 className="mt-3 text-5xl font-bold text-orange-400">18</h2>
    <p className="mt-3 text-orange-300">Needs attention</p>
  </div>

</motion.section>
<section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.10)]">

  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

    <input
      type="text"
      placeholder="🔍 Search complaints..."
      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-cyan-400 lg:max-w-md"
    />

    <div className="flex flex-wrap gap-3">

      <button className="rounded-full bg-cyan-500 px-5 py-2 font-medium text-slate-950">
        All
      </button>

      <button className="rounded-full border border-orange-500/30 px-5 py-2 text-orange-400">
        Pending
      </button>

      <button className="rounded-full border border-emerald-500/30 px-5 py-2 text-emerald-400">
        Resolved
      </button>

      <button className="rounded-full border border-red-500/30 px-5 py-2 text-red-400">
        Critical
      </button>

    </div>

  </div>

</section>
<section className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.10)]">

  <table className="w-full">

    <thead className="border-b border-slate-800 bg-slate-950/50">

      <tr className="text-left text-slate-400">

        <th className="px-6 py-4">ID</th>
        <th className="px-6 py-4">Category</th>
        <th className="px-6 py-4">Ward</th>
        <th className="px-6 py-4">Priority</th>
        <th className="px-6 py-4">Status</th>

      </tr>

    </thead>

    <tbody>

      <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition">

        <td className="px-6 py-5 font-semibold">#1024</td>

        <td className="px-6 py-5">Road Damage</td>

        <td className="px-6 py-5">Ward 5</td>

        <td className="px-6 py-5">
          <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs text-orange-300">
            High
          </span>
        </td>

        <td className="px-6 py-5">
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
            In Progress
          </span>
        </td>

      </tr>

      <tr className="hover:bg-slate-800/30 transition">

        <td className="px-6 py-5 font-semibold">#1025</td>

        <td className="px-6 py-5">Water Leakage</td>

        <td className="px-6 py-5">Ward 11</td>

        <td className="px-6 py-5">
          <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300">
            Critical
          </span>
        </td>

        <td className="px-6 py-5">
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
            Resolved
          </span>
        </td>

      </tr>

    </tbody>

  </table>

</section>
<motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-10 grid gap-6 md:grid-cols-3"
>

  <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.20)]">
    <p className="text-sm text-slate-400">
      AI Resolution Prediction
    </p>

    <h2 className="mt-4 text-4xl font-bold text-emerald-400">
      92%
    </h2>

    <p className="mt-3 text-slate-400">
      Expected to be resolved within 24 hours.
    </p>

  </div>

  <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.20)]">

    <p className="text-sm text-slate-400">
      Average Response Time
    </p>

    <h2 className="mt-4 text-4xl font-bold text-cyan-400">
      2.4h
    </h2>

    <p className="mt-3 text-slate-400">
      Faster than last week.
    </p>

  </div>

  <div className="rounded-3xl border border-orange-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,146,60,0.20)]">

    <p className="text-sm text-slate-400">
      AI Priority Score
    </p>

    <h2 className="mt-4 text-4xl font-bold text-orange-400">
      High
    </h2>

    <p className="mt-3 text-slate-400">
      Water logging complaints require immediate attention.
    </p>

  </div>

</motion.section>
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(34,211,238,0.12)]"
>

  <div className="mb-8 flex items-center justify-between">

    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
        Live Activity
      </p>

      <h2 className="mt-2 text-3xl font-bold text-white">
        Recent Updates
      </h2>
    </div>

    <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
      Live
    </span>

  </div>

  <div className="space-y-6">

    <div className="flex items-center justify-between border-b border-slate-800 pb-5 transition-all duration-300 hover:translate-x-2 hover:bg-slate-800/20 rounded-xl px-3">
      <div>
        <h3 className="font-semibold text-white">
          Water Leakage Complaint Assigned
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Ward 11 • AI Priority High
        </p>
      </div>

      <span className="text-sm text-cyan-400">
        2 min ago
      </span>
    </div>

    <div className="flex items-center justify-between border-b border-slate-800 pb-5 transition-all duration-300 hover:translate-x-2 hover:bg-slate-800/20 rounded-xl px-3">
      <div>
        <h3 className="font-semibold text-white">
          Garbage Overflow Verified
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Ward 7 • Officer Confirmed
        </p>
      </div>

      <span className="text-sm text-orange-400">
        18 min ago
      </span>
    </div>

    <div className="flex items-center justify-between transition-all duration-300 hover:translate-x-2 hover:bg-slate-800/20 rounded-xl px-3">
      <div>
        <h3 className="font-semibold text-white">
          Road Damage Resolved
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Ward 5 • Status Updated
        </p>
      </div>

      <span className="text-sm text-emerald-400">
        1 hr ago
      </span>
    </div>

  </div>

</motion.section>

      </div>
    </main>
  );
}