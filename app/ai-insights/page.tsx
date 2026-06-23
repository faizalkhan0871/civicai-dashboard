"use client";
import { motion } from "framer-motion";

export default function AIInsightsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      
      <div className="mx-auto max-w-7xl px-6 py-10">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          CivicAI
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          AI Insights Center
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-400">
  AI-powered predictions, risk analysis and smart recommendations
  for proactive city management.
</p>

<motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
>

  <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

    <p className="text-sm text-slate-400">
      AI Confidence
    </p>

    <h2 className="mt-4 text-5xl font-black text-cyan-400">
      94%
    </h2>

    <p className="mt-3 text-slate-400">
      Model prediction confidence
    </p>

  </div>

  <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]">

    <p className="text-sm text-slate-400">
      Predicted Resolution
    </p>

    <h2 className="mt-4 text-5xl font-black text-emerald-400">
      96%
    </h2>

    <p className="mt-3 text-slate-400">
      Expected successful closures
    </p>

  </div>

  <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-400 hover:shadow-[0_0_40px_rgba(251,146,60,0.15)]">

    <p className="text-sm text-slate-400">
      Risk Zones
    </p>

    <h2 className="mt-4 text-5xl font-black text-orange-400">
      08
    </h2>

    <p className="mt-3 text-slate-400">
      Areas needing monitoring
    </p>

  </div>

</motion.section>
<motion.section
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="mt-12"
>

  <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-[0_0_60px_rgba(16,185,129,0.25)]">

    <div className="flex items-center gap-3">

      <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>

      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
        AI Recommendation
      </p>

    </div>

    <h2 className="mt-5 text-3xl font-bold text-white">
      Immediate Action Suggested
    </h2>

    <p className="mt-4 max-w-3xl text-slate-300">
      AI analysis predicts a surge in water logging complaints across Ward 11
      and Ward 14 during the next 24 hours. Deploying field teams proactively
      could reduce complaint volume by an estimated 18%.
    </p>

  </div>

</motion.section>
<section className="mt-12">

  <h2 className="text-3xl font-bold text-white">
    Prediction Timeline
  </h2>
  

  <div className="mt-8 space-y-6">

    <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
      <div className="flex items-center gap-3">

  <div className="h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"></div>

  <p className="font-semibold text-cyan-400">
    Next 6 Hours
  </p>

</div>

      <p className="mt-2 text-slate-300">
        Complaint volume expected to increase by 8%.
      </p>
    </div>

    <div className="rounded-2xl border border-orange-500/20 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]">
      <div className="flex items-center gap-3">

  <div className="h-4 w-4 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.8)]"></div>

  <p className="font-semibold text-orange-400">
    Next 24 Hours
  </p>

</div>

      <p className="mt-2 text-slate-300">
        High probability of water logging incidents in Ward 11.
      </p>
    </div>

    <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
      <div className="flex items-center gap-3">

  <div className="h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]"></div>

  <p className="font-semibold text-emerald-400">
    Next 7 Days
  </p>

</div>

      <p className="mt-2 text-slate-300">
        Resolution rate projected to reach 96%.
      </p>
    </div>

  </div>

</section>
      </div>
    </main>
  );
}