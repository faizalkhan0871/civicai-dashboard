"use client";
import { useState } from "react";
import { createComplaint } from "@/services/complaintService";

export default function CreateComplaintPage() {
    const [formData, setFormData] = useState({
  title: "",
  description: "",
  category: "Road Damage",
  location: "",
});
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await createComplaint(formData);

    console.log(response);

    alert("Complaint Created Successfully ✅");
  } catch (error) {
    console.error(error);
    alert("Failed to create complaint");
  }
};
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-3xl px-8 py-10">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          CivicAI Dashboard
        </p>
 <h1 className="mt-4 text-5xl font-bold">
          Create Complaint
        </h1>

        <p className="mt-4 text-slate-400">
          Submit a new civic complaint.
        </p>
<form onSubmit={handleSubmit} className="mt-10 space-y-6">

  <div>
    <label className="mb-2 block text-sm text-slate-300">
      Complaint Title
    </label>

    <input
  type="text"
  placeholder="Enter complaint title"
  value={formData.title}
  onChange={(e) =>
    setFormData({ ...formData, title: e.target.value })
  }
  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
/>
  </div>

  <div>
    <label className="mb-2 block text-sm text-slate-300">
      Description
    </label>

    <textarea
  rows={5}
  placeholder="Describe the issue..."
  value={formData.description}
  onChange={(e) =>
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }
  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
/>
  </div>

  <div>
    <label className="mb-2 block text-sm text-slate-300">
      Category
    </label>

    <select
  value={formData.category}
  onChange={(e) =>
    setFormData({
      ...formData,
      category: e.target.value,
    })
  }
  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
>
  <option>Road Damage</option>
  <option>Water Leakage</option>
  <option>Garbage</option>
  <option>Street Light</option>
  <option>Other</option>
</select>
  </div>

  <div>
    <label className="mb-2 block text-sm text-slate-300">
      Location
    </label>

    <input
  type="text"
  placeholder="Enter location"
  value={formData.location}
  onChange={(e) =>
    setFormData({
      ...formData,
      location: e.target.value,
    })
  }
  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
/>
  </div>

  <button
    type="submit"
    className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
  >
    Submit Complaint
  </button>

</form>
       
      </div>
    </main>
  );
}