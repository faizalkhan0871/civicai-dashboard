"use client"
import Link from "next/link"


import { motion } from "framer-motion"
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Brain,
  Clock3,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  BarChart3,
  Sparkles,
  Settings
} from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        <aside className="hidden lg:block w-64 shrink-0">
  <div className="sticky top-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">

    <h2 className="text-lg font-bold text-white">
      CivicAI
    </h2>

    <div className="mt-6 space-y-3">

      <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
  <LayoutDashboard size={18} />
  <span>Dashboard</span>
</div>

      <Link
  href="/complaints"
  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition-all duration-300 hover:bg-slate-800/50 hover:text-white"
>
  <FileText size={18} />
  <span>Complaints</span>
</Link>

     <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition-all duration-300 hover:bg-slate-800/50 hover:text-white cursor-pointer">
  <BarChart3 size={18} />
  <span>Analytics</span>
</div>

      <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition-all duration-300 hover:bg-slate-800/50 hover:text-white cursor-pointer">
  <Sparkles size={18} />
  <span>AI Insights</span>
</div>

      <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition-all duration-300 hover:bg-slate-800/50 hover:text-white cursor-pointer">
  <Settings size={18} />
  <span>Settings</span>
</div>

    </div>
  </div>
</aside>
<div className="flex-1">
        <header className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-4 backdrop-blur-xl">
          <div>
            <h1 className="text-xl font-bold text-white">
              CivicAI Command Center
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">
                Faizal
              </p>

              <p className="text-xs text-slate-400">
                System Admin
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
              F
            </div>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 mb-10"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Civic Intelligence Platform
          </p>

          <h1 className="mt-4 text-5xl font-bold text-white">
            Smart Civic Complaint Management
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            AI-powered monitoring, prioritization and resolution tracking for
            modern city operations.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
  >
    <div className="flex items-center justify-between">
  <p className="text-sm text-slate-400">
    Total Complaints
  </p>

  <Activity size={20} className="text-cyan-400" />
</div>

    <h2 className="mt-3 text-4xl font-bold text-white">
      1,248
    </h2>

    <p className="mt-2 text-sm text-green-400">
      +8.4% this week
    </p>
  </motion.div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
    <div className="flex items-center justify-between">
  <p className="text-sm text-slate-400">
    Resolved Issues
  </p>

  <CheckCircle size={20} className="text-emerald-400" />
</div>

    <h2 className="mt-3 text-5xl font-black tracking-tight text-white">
      932
    </h2>

    <p className="mt-2 text-sm text-cyan-400">
      +5.1% this week
    </p>
  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
    <div className="flex items-center justify-between">
  <p className="text-sm text-slate-400">
    Critical Alerts
  </p>

  <AlertTriangle size={20} className="text-orange-400" />
</div>

    <h2 className="mt-3 text-4xl font-bold text-white">
      18
    </h2>

    <p className="mt-2 text-sm text-orange-400">
      Needs attention
    </p>
  </div>

</div>

 <section className="mt-12">
  <div className="mb-6">
  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
    Live Monitoring
  </p>

  <h2 className="mt-2 text-3xl font-bold text-white">
    Recent Civic Complaints
  </h2>
</div>

  <div className="mt-6 grid gap-6 lg:grid-cols-3">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 transition-all duration-500 hover:-translate-y-3 hover:border-slate-700 hover:shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
    >
      <div className="h-52 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200"
          alt="Road Damage"
          className="h-full w-full object-cover transition duration-700 hover:scale-110"
        />
      </div>

      <div className="p-5">
        <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-300">
          High Priority
        </span>

        <h3 className="mt-4 text-xl font-semibold text-white">
          Road Damage Reported
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Ward 5 • Reported 1 hour ago
        </p>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 transition-all duration-500 hover:-translate-y-3 hover:border-slate-700 hover:shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
    >
      <div className="h-52 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200"
          alt="Water Logging"
          className="h-full w-full object-cover transition duration-700 hover:scale-110"
        />
      </div>

      <div className="p-5">
        <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300">
          Critical
        </span>

        <h3 className="mt-4 text-xl font-semibold text-white">
          Water Logging Near Market
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Ward 11 • Reported 15 mins ago
        </p>
      </div>
    </motion.div>

  </div>
</section>



<section className="mt-12">
  <div className="flex items-center gap-3">
  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
    AI POWERED
  </span>

  <h2 className="text-3xl font-bold text-white">
    AI Insights Panel
  </h2>
</div>

  <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.08)]">
    <div className="grid gap-6 md:grid-cols-3">
      <div>
        <div className="flex items-center gap-2 text-slate-400">
  <Brain size={18} className="text-cyan-400" />
  <p>AI Confidence</p>
</div>
        <h3 className="mt-2 text-5xl font-black tracking-tight text-cyan-400">
  94%
</h3>
      </div>

      <div>
        <div className="flex items-center gap-2 text-slate-400">
  <Clock3 size={18} className="text-emerald-400" />
  <p>Response Time</p>
</div>
        <h3 className="mt-2 text-5xl font-black tracking-tight text-emerald-400">
  2.4 hrs
</h3>
      </div>

      <div>
        <div className="flex items-center gap-2 text-slate-400">
  <ShieldCheck size={18} className="text-orange-400" />
  <p>Risk Level</p>
</div>
        <h3 className="mt-2 text-5xl font-black tracking-tight text-orange-400">
  Medium
</h3>
      </div>
    </div>
  </div>
</section>
<section className="mt-12">
  <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6 backdrop-blur-xl">

    <div className="flex items-center gap-3">
      <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />

      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
        AI Recommendation
      </p>
    </div>

    <h3 className="mt-4 text-2xl font-bold text-white">
      Priority Dispatch Suggested
    </h3>

    <p className="mt-3 max-w-3xl text-slate-300">
      AI analysis indicates a high probability of escalation for water logging complaints in Ward 11.
      Dispatching a field response team within the next 2 hours is recommended to prevent service disruption.
    </p>

  </div>
</section>
 <section className="mt-12">
  <div className="mb-6">
    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
      Analytics
    </p>

    <h2 className="mt-2 text-3xl font-bold text-white">
      Complaint Trend Overview
    </h2>
  </div>

  <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
    <div className="flex h-64 items-end justify-between gap-4">

      <div className="flex flex-col items-center gap-2">
        <div className="h-20 w-10 rounded-t-xl bg-cyan-500"></div>
        <span className="text-xs text-slate-400">Mon</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="h-32 w-10 rounded-t-xl bg-cyan-500"></div>
        <span className="text-xs text-slate-400">Tue</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="h-44 w-10 rounded-t-xl bg-cyan-500"></div>
        <span className="text-xs text-slate-400">Wed</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="h-28 w-10 rounded-t-xl bg-cyan-500"></div>
        <span className="text-xs text-slate-400">Thu</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="h-56 w-10 rounded-t-xl bg-cyan-500"></div>
        <span className="text-xs text-slate-400">Fri</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="h-36 w-10 rounded-t-xl bg-cyan-500"></div>
        <span className="text-xs text-slate-400">Sat</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="h-60 w-10 rounded-t-xl bg-cyan-500"></div>
        <span className="text-xs text-slate-400">Sun</span>
      </div>

    </div>
  </div>
</section>

      </div>
      </div>
      
    </main>
  )
}