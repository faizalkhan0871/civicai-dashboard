"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getComplaints,
  deleteComplaint,
  updateComplaint,
} from "@/services/complaintService";
export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [editingId, setEditingId] = useState("");
const [editingStatus, setEditingStatus] = useState("");
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const resolvedComplaints = complaints.filter(
  (c) => c.status === "Resolved"
);
const pendingComplaints = complaints.filter(
  (c) => c.status === "Pending"
);

const criticalComplaints = complaints.filter(
  (c) => c.priority === "High"
);
const filteredComplaints = complaints.filter((complaint) => {
  const matchesSearch =
    complaint.title.toLowerCase().includes(search.toLowerCase()) ||
    complaint.location.toLowerCase().includes(search.toLowerCase());

  if (filter === "Pending") {
    return matchesSearch && complaint.status === "Pending";
  }

  if (filter === "Resolved") {
    return matchesSearch && complaint.status === "Resolved";
  }

  if (filter === "Critical") {
    return matchesSearch && complaint.priority === "High";
  }

  return matchesSearch;
});
const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this complaint?"
  );

  if (!confirmDelete) return;

  try {
    await deleteComplaint(id);

    setComplaints((prev) =>
      prev.filter((complaint) => complaint._id !== id)
    );

    alert("Complaint deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete complaint");
  }
};
const handleUpdateStatus = async () => {
  try {
    await updateComplaint(editingId, {
      status: editingStatus,
    });

    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint._id === editingId
          ? { ...complaint, status: editingStatus }
          : complaint
      )
    );

    alert("Complaint updated successfully");

    setEditingId("");
    setEditingStatus("");
  } catch (error) {
    console.error(error);
    alert("Update failed");
  }
};
useEffect(() => {
  if (editingId && editingStatus) {
    handleUpdateStatus();
  }
}, [editingStatus]);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getComplaints();
        console.log("Complaints:", data);
        setComplaints(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaints();
  }, []);
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
    <h2 className="mt-3 text-5xl font-bold text-cyan-400">
  {complaints.length}
</h2>
    <p className="mt-3 text-emerald-400">+8% this week</p>
  </div>

  <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.20)]">
    <p className="text-sm text-slate-400">Resolved</p>
    <h2 className="mt-3 text-5xl font-bold text-emerald-400">{resolvedComplaints.length}</h2>
    <p className="mt-3 text-cyan-400">75% completion</p>
  </div>

  <div className="rounded-3xl border border-orange-500/20 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,146,60,0.20)]">
    <p className="text-sm text-slate-400">Critical Cases</p>
    <h2 className="mt-3 text-5xl font-bold text-orange-400">{criticalComplaints.length}</h2>
    <p className="mt-3 text-orange-300">Needs attention</p>
  </div>

</motion.section>
<section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.10)]">

  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

    <input
  type="text"
  placeholder="🔍 Search complaints..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-cyan-400 lg:max-w-md"
/>

    <div className="flex flex-wrap gap-3">

      <button
  onClick={() => setFilter("All")}
  className={`rounded-full px-5 py-2 font-medium transition ${
    filter === "All"
      ? "bg-cyan-500 text-slate-950"
      : "border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950"
  }`}
>
  All
</button>

      <button
  onClick={() => setFilter("Pending")}
  className={`rounded-full px-5 py-2 font-medium transition ${
    filter === "Pending"
      ? "bg-orange-500 text-white"
      : "border border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:text-white"
  }`}
>
  Pending
</button>

      <button
  onClick={() => setFilter("Resolved")}
  className={`rounded-full px-5 py-2 font-medium transition ${
    filter === "Resolved"
      ? "bg-emerald-500 text-white"
      : "border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white"
  }`}
>
  Resolved
</button>

      <button
  onClick={() => setFilter("Critical")}
  className={`rounded-full px-5 py-2 font-medium transition ${
    filter === "Critical"
      ? "bg-red-500 text-white"
      : "border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
  }`}
>
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
        <th className="px-6 py-4">Actions</th>

      </tr>

    </thead>

    <tbody>
  {filteredComplaints.map((complaint: any) => (
    <tr
      key={complaint._id}
      className="border-b border-slate-800 hover:bg-slate-800/30 transition"
    >
      <td className="px-6 py-5 font-semibold">
        {complaint._id.slice(-6)}
      </td>

      <td className="px-6 py-5">
        {complaint.title}
      </td>

      <td className="px-6 py-5">
        {complaint.location}
      </td>

      <td className="px-6 py-5">
        {complaint.priority}
      </td>

      <td className="px-6 py-5">
        {complaint.status}
      </td>
      <td className="px-6 py-5 flex gap-2">

  <button
  onClick={() => {
    const status = prompt(
      "Enter status: Pending, In Progress, Resolved",
      complaint.status
    );

    if (!status) return;

    setEditingId(complaint._id);
    setEditingStatus(status);
  }}
  className="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
>
  Edit
</button>

  <button
    onClick={() => handleDelete(complaint._id)}
    className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
  >
    Delete
  </button>

</td>
    </tr>
  ))}
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