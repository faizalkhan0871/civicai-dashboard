"use client";

import { useState } from "react";
import { createComplaint } from "@/services/complaintService";
import { uploadComplaintImage } from "@/services/uploadService";
import {
  analyzeComplaint,
  ComplaintAnalysis,
} from "@/services/aiService";
import { toast } from "sonner";

export default function CreateComplaintPage() {
    const [formData, setFormData] = useState({
  title: "",
  description: "",
  category: "Road Damage",
  priority: "Medium",
  location: "",
});
const [selectedImage, setSelectedImage] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const [aiLoading, setAiLoading] = useState(false);

const [aiRecommendation, setAiRecommendation] =
  useState<ComplaintAnalysis | null>(null);
const handleSuggestPriority = async () => {
  if (!formData.title.trim()) {
    toast.error("Enter complaint title first");
    return;
  }

  if (!formData.description.trim()) {
    toast.error("Enter complaint description first");
    return;
  }

  setAiLoading(true);

  try {
    const response = await analyzeComplaint(
  formData.title,
  formData.description
);

setAiRecommendation(response);

toast.success("AI analysis completed");
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
      "Failed to generate AI recommendation"
    );
  } finally {
    setAiLoading(false);
  }
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.title.trim()) {
  toast.error("Title is required");
  return;
}

if (formData.title.trim().length < 5) {
  toast.error("Title must be at least 5 characters");
  return;
}

if (!formData.description.trim()) {
  toast.error("Description is required");
  return;
}

if (formData.description.trim().length < 10) {
  toast.error("Description must be at least 10 characters");
  return;
}

if (!formData.location.trim()) {
  toast.error("Location is required");
  return;
}
setLoading(true);
  try {
    let imagePath = "";

    // Step 1: Upload image if selected
    if (selectedImage) {
      const uploadResponse = await uploadComplaintImage(selectedImage);
      imagePath = uploadResponse.image;
    }

    // Step 2: Create complaint with image path
    const complaintData = {
      ...formData,
      image: imagePath,
    };

    const response = await createComplaint(complaintData);

    console.log(response);

    toast.success("Complaint submitted successfully");

    // Step 3: Reset form
    setFormData({
      title: "",
      description: "",
      category: "Road Damage",
      priority: "Medium",
      location: "",
    });

    setSelectedImage(null);
    setImagePreview(null);

  } catch (error: any) {
  if (error.response?.status === 400) {
    const errors = error.response.data?.errors;

    if (errors?.length) {
      toast.error(errors[0].msg);
    } else {
      toast.error("Invalid form data");
    }
  } else {
    toast.error(
  error.response?.data?.message ||
  "Failed to create complaint"
);
  }
} finally {
  setLoading(false);
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
  autoFocus
maxLength={100}
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
  maxLength={1000}
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
<p className="mt-2 text-right text-xs text-slate-400">
  {formData.description.length}/1000 characters
</p>
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
    Priority
  </label>

  <select
    value={formData.priority}
    onChange={(e) =>
      setFormData({
        ...formData,
        priority: e.target.value,
      })
    }
    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
  >
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>
  <button
  type="button"
  onClick={handleSuggestPriority}
  disabled={aiLoading}
  className="mt-3 rounded-xl bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
>
  {aiLoading ? "Analyzing..." : "✨ Analyze Complaint with AI"}
</button>

{/* 👇 YE CODE YAHAN PASTE KARNA HAI */}

{aiRecommendation && (
  <div className="mt-4 rounded-2xl border border-cyan-500 bg-slate-900 p-6">
    <h3 className="text-xl font-semibold text-cyan-400">
      🤖 AI Smart Complaint Analysis
    </h3>

    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <div>
  <p className="text-sm text-slate-400">Severity Score</p>
  <p className="mt-1 font-semibold text-orange-400">
    {aiRecommendation.severityScore}/10
  </p>
</div>

<div>
  <p className="text-sm text-slate-400">Risk Level</p>
  <span
    className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
      aiRecommendation.riskLevel === "Critical"
        ? "bg-red-500/20 text-red-400"
        : aiRecommendation.riskLevel === "High"
        ? "bg-orange-500/20 text-orange-400"
        : aiRecommendation.riskLevel === "Medium"
        ? "bg-yellow-500/20 text-yellow-300"
        : "bg-green-500/20 text-green-400"
    }`}
  >
    {aiRecommendation.riskLevel}
  </span>
</div>

<div>
  <p className="text-sm text-slate-400">Response Time</p>
  <p className="mt-1 font-semibold text-white">
    {aiRecommendation.responseTime}
  </p>
</div>

<div>
  <p className="text-sm text-slate-400">Citizen Impact</p>
  <p className="mt-1 font-semibold text-white">
    {aiRecommendation.citizenImpact}
  </p>
</div>
      <div>
        <p className="text-sm text-slate-400">Category</p>
        <p className="mt-1 font-semibold text-white">
          {aiRecommendation.category}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-400">Priority</p>
        <p className="mt-1 font-semibold text-white">
          {aiRecommendation.priority}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-400">Department</p>
        <p className="mt-1 font-semibold text-white">
          {aiRecommendation.department}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-400">Tags</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {aiRecommendation.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
<div className="mt-6">
  <p className="text-sm text-slate-400">AI Summary</p>

  <p className="mt-2 rounded-xl bg-slate-800 p-3 text-slate-200">
    {aiRecommendation.summary}
  </p>
</div>

<div className="mt-6">
  <p className="mb-2 text-sm text-slate-400">
    Suggested Actions
  </p>

  <ul className="space-y-2">
    {aiRecommendation.suggestedActions.map((action) => (
      <li
        key={action}
        className="rounded-lg bg-slate-800 px-3 py-2 text-slate-200"
      >
        ✅ {action}
      </li>
    ))}
  </ul>
</div>
    <button
      type="button"
      onClick={() =>
        setFormData({
          ...formData,
          category: aiRecommendation.category,
          priority: aiRecommendation.priority,
        })
      }
      className="mt-6 rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400"
    >
      Apply AI Suggestions
    </button>
  </div>
)}
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
<div>
  <label className="mb-2 block text-sm text-slate-300">
    Complaint Image
  </label>

  <input
    type="file"
    disabled={loading}
    accept="image/jpeg,image/png,image/webp"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

if (file.size > 5 * 1024 * 1024) {
  toast.error("Image size must be less than 5 MB");
  return;
}
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

if (!allowedTypes.includes(file.type)) {
  toast.error("Only JPG, PNG and WEBP images are allowed");
  return;
}

      
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }}
    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-300 outline-none focus:border-cyan-400"
  />

  {imagePreview && (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700">
      <img
  src={imagePreview}
  alt="Complaint preview"
  loading="lazy"
  className="h-64 w-full object-cover"
/>
    </div>
  )}
</div>
  <button
  disabled={loading}
    type="submit"
    aria-busy={loading}
    className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {loading ? "Submitting..." : "Submit Complaint"}
  </button>

</form>
       
      </div>
    </main>
  );
}