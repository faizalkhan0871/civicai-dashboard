"use client";
import { useState } from "react";
import { createComplaint } from "@/services/complaintService";
import { uploadComplaintImage } from "@/services/uploadService";
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