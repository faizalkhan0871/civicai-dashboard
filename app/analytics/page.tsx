"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { day: "Mon", complaints: 42 },
  { day: "Tue", complaints: 65 },
  { day: "Wed", complaints: 91 },
  { day: "Thu", complaints: 58 },
  { day: "Fri", complaints: 104 },
  { day: "Sat", complaints: 73 },
  { day: "Sun", complaints: 118 },
];
export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          CivicAI Dashboard
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-400">
          AI powered analytics and performance insights for civic complaints.
        </p>
        <section className="mt-10 grid gap-6 md:grid-cols-4">

  <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6">
    <p className="text-sm text-slate-400">Total Reports</p>
    <h2 className="mt-4 text-5xl font-bold text-cyan-400">12.4K</h2>
    <p className="mt-3 text-emerald-400">+12% this month</p>
  </div>

  <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6">
    <p className="text-sm text-slate-400">Resolved Rate</p>
    <h2 className="mt-4 text-5xl font-bold text-emerald-400">91%</h2>
    <p className="mt-3 text-cyan-400">Excellent performance</p>
  </div>

  <div className="rounded-3xl border border-orange-500/20 bg-slate-900/60 p-6">
    <p className="text-sm text-slate-400">Avg Response</p>
    <h2 className="mt-4 text-5xl font-bold text-orange-400">2.4h</h2>
    <p className="mt-3 text-orange-300">AI optimized</p>
  </div>

  <div className="rounded-3xl border border-purple-500/20 bg-slate-900/60 p-6">
    <p className="text-sm text-slate-400">AI Accuracy</p>
    <h2 className="mt-4 text-5xl font-bold text-purple-400">96%</h2>
    <p className="mt-3 text-purple-300">Prediction engine</p>
  </div>

</section>
<section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">

  <div className="mb-8">

    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
      Weekly Analytics
    </p>

    <h2 className="mt-2 text-4xl font-bold">
      Complaint Trend
    </h2>

  </div>

  <div className="h-80 w-full">

  <ResponsiveContainer width="100%" height="100%">

    <BarChart data={data}>
<CartesianGrid
  stroke="#1e293b"
  strokeDasharray="4 4"
  vertical={false}
/>

<YAxis
  stroke="#64748b"
  axisLine={false}
  tickLine={false}
/>
      <XAxis
        dataKey="day"
        stroke="#94a3b8"
      />

      <Tooltip
        contentStyle={{
          background: "#020617",
          border: "1px solid #1e293b",
          borderRadius: "12px",
          color: "#fff",
        }}
      />

      <>
  <defs>
    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#22d3ee" />
      <stop offset="100%" stopColor="#0891b2" />
    </linearGradient>
  </defs>

  <Bar
    dataKey="complaints"
    fill="url(#barGradient)"
    radius={[14, 14, 0, 0]}
    animationDuration={1800}
  />
</>

    </BarChart>

  </ResponsiveContainer>

</div>
</section>
{/* AI Performance Panel Start */}

<section className="mt-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-slate-900 to-slate-950 p-8">

  <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
    AI PERFORMANCE
  </p>

  <h2 className="mt-4 text-4xl font-bold">
    Smart Analysis
  </h2>

  <div className="mt-8 grid gap-6 md:grid-cols-3">

    <div>
      <p className="text-slate-400">Prediction Accuracy</p>
      <h3 className="mt-2 text-5xl font-bold text-emerald-400">96%</h3>
    </div>

    <div>
      <p className="text-slate-400">Average Resolution</p>
      <h3 className="mt-2 text-5xl font-bold text-cyan-400">2.1h</h3>
    </div>

    <div>
      <p className="text-slate-400">Citizen Satisfaction</p>
      <h3 className="mt-2 text-5xl font-bold text-orange-400">4.8★</h3>
    </div>

  </div>

</section>

{/* AI Performance Panel End */}


      </div>
    </main>
  );
}