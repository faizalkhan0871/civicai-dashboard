"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getComplaints } from "@/services/complaintService";
import { getAnalytics } from "@/services/analyticsService";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function AnalyticsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
const [analytics, setAnalytics] = useState({
  categoryStats: [],
  statusStats: [],
  priorityStats: [],
});
useEffect(() => {
  const fetchComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
      const analyticsData = await getAnalytics();
    setAnalytics(analyticsData);
    console.log(analyticsData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchComplaints();
}, []);
const chartData = [
  {
    day: "Complaints",
    complaints: complaints.length,
  },
];
const COLORS = [
  "#22d3ee",
  "#10b981",
  "#f97316",
  "#a855f7",
  "#ef4444",
];

const categoryData = analytics.categoryStats.map((item: any) => ({
  name: item._id,
  value: item.count,
}));
const statusData = analytics.statusStats.map((item: any) => ({
  status:
    item._id?.toLowerCase() === "resolved"
      ? "Resolved"
      : item._id,
  complaints: item.count,
}));
const priorityData = analytics.priorityStats
  .filter((item: any) => item._id)
  .map((item: any) => ({
    name: item._id,
    value: item.count,
  }));
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
        <motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-10 grid gap-6 md:grid-cols-4"
>

  <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.20)]">
    <p className="text-sm text-slate-400">Total Reports</p>
    <h2 className="mt-4 text-5xl font-bold text-cyan-400">12.4K</h2>
    <p className="mt-3 text-emerald-400">+12% this month</p>
  </div>

  <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.20)]">
    <p className="text-sm text-slate-400">Resolved Rate</p>
    <h2 className="mt-4 text-5xl font-bold text-emerald-400">91%</h2>
    <p className="mt-3 text-cyan-400">Excellent performance</p>
  </div>

  <div className="rounded-3xl border border-orange-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,146,60,0.20)]">
    <p className="text-sm text-slate-400">Avg Response</p>
    <h2 className="mt-4 text-5xl font-bold text-orange-400">2.4h</h2>
    <p className="mt-3 text-orange-300">AI optimized</p>
  </div>

  <div className="rounded-3xl border border-purple-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.20)]">
    <p className="text-sm text-slate-400">AI Accuracy</p>
    <h2 className="mt-4 text-5xl font-bold text-purple-400">96%</h2>
    <p className="mt-3 text-purple-300">Prediction engine</p>
  </div>

</motion.section>
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(34,211,238,0.12)]"
>

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

    <BarChart data={statusData}>
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
  dataKey="status"
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
</motion.section>
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-8"
>
  <h2 className="mb-8 text-3xl font-bold">
    Complaints by Category
  </h2>

  <div className="h-96">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
  data={categoryData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={140}
  label={({ name, value }) => `${name} (${value})`}
>
          {categoryData.map((_: any, index: number) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</motion.section>
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-8"
>
  <h2 className="mb-8 text-3xl font-bold">
    Complaints by Priority
  </h2>

  <div className="h-96">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={priorityData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          label={({ name, value }) => `${name} (${value})`}
        >
          {priorityData.map((_: any, index: number) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</motion.section>
{/* AI Performance Panel Start */}

<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="mt-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-slate-900 to-slate-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(16,185,129,0.15)]"
>

  <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
    AI PERFORMANCE
  </p>

  <h2 className="mt-4 text-4xl font-bold">
    Smart Analysis
  </h2>

  <div className="mt-8 grid gap-6 md:grid-cols-3">

    <div className="rounded-2xl p-4 transition-all duration-300 hover:bg-slate-800/30 hover:-translate-y-2">
      <p className="text-slate-400">Prediction Accuracy</p>
      <h3 className="mt-2 text-5xl font-bold text-emerald-400">96%</h3>
    </div>

    <div className="rounded-2xl p-4 transition-all duration-300 hover:bg-slate-800/30 hover:-translate-y-2">
      <p className="text-slate-400">Average Resolution</p>
      <h3 className="mt-2 text-5xl font-bold text-cyan-400">2.1h</h3>
    </div>

    <div className="rounded-2xl p-4 transition-all duration-300 hover:bg-slate-800/30 hover:-translate-y-2">
      <p className="text-slate-400">Citizen Satisfaction</p>
      <h3 className="mt-2 text-5xl font-bold text-orange-400">4.8★</h3>
    </div>

  </div>

</motion.section>

{/* AI Performance Panel End */}


      </div>
    </main>
  );
}