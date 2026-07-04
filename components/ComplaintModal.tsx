"use client";

import { useState } from "react";
import {
  updateComplaint,
  deleteComplaint,
} from "@/services/complaintService";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  FolderOpen,
  AlertTriangle,
  CheckCircle,
  CalendarDays,
  FileText,
} from "lucide-react";

interface ComplaintModalProps {
  complaint: any;
  onClose: () => void;
  onUpdated: (updatedComplaint: any) => void;
  onDeleted: (deletedId: string) => void;
}
export default function ComplaintModal({
  complaint,
  onClose,
  onUpdated,
  onDeleted,
}: ComplaintModalProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
const [isEditing, setIsEditing] = useState(false);

const [editData, setEditData] = useState({
  title: complaint.title || "",
  description: complaint.description || "",
  category: complaint.category || "Road Damage",
  priority: complaint.priority || "Medium",
  location: complaint.location || "",
  status: complaint.status || "Pending",
});

const [isSaving, setIsSaving] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);
const handleSaveEdit = async () => {
  try {
    setIsSaving(true);

    const updatedComplaint = await updateComplaint(
  complaint._id,
  editData
);

onUpdated(updatedComplaint);

setIsEditing(false);

alert("Complaint Updated Successfully ✅");  } catch (error) {
    console.error(error);
    alert("Failed to update complaint");
  } finally {
    setIsSaving(false);
  }
};
const handleDeleteComplaint = async () => {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${complaint.title}"?`
  );

  if (!confirmed) return;

  try {
    setIsDeleting(true);

    await deleteComplaint(complaint._id);

onDeleted(complaint._id);

alert("Complaint Deleted Successfully ✅");

onClose();
  } catch (error) {
    console.error(error);
    alert("Failed to delete complaint");
  } finally {
    setIsDeleting(false);
  }
};
  if (!complaint) return null;

  return (
    <AnimatePresence>
      <motion.div
       key="complaint-modal"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-auto my-8 w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl"
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-800 p-6">

            <div>

              <h2 className="text-3xl font-bold text-white">
                {complaint.title}
              </h2>

              <p className="mt-1 text-slate-400">
                Complaint Details
              </p>

            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-slate-800 p-2 transition hover:bg-red-500"
            >
              <X className="h-5 w-5 text-white" />
            </button>

          </div>
{isEditing && (
  <div className="border-b border-slate-800 bg-slate-950/50 p-6">
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-bold text-white">
          Edit Complaint
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Update complaint information
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="rounded-xl bg-slate-800 p-2 text-slate-300 transition hover:bg-red-500 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <input
        type="text"
        value={editData.title}
        onChange={(e) =>
          setEditData({
            ...editData,
            title: e.target.value,
          })
        }
        placeholder="Complaint title"
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
      />

      <input
        type="text"
        value={editData.location}
        onChange={(e) =>
          setEditData({
            ...editData,
            location: e.target.value,
          })
        }
        placeholder="Location"
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
      />

      <select
        value={editData.category}
        onChange={(e) =>
          setEditData({
            ...editData,
            category: e.target.value,
          })
        }
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
      >
        <option value="Road Damage">Road Damage</option>
        <option value="Water Leakage">Water Leakage</option>
        <option value="Garbage">Garbage</option>
        <option value="Street Light">Street Light</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={editData.priority}
        onChange={(e) =>
          setEditData({
            ...editData,
            priority: e.target.value,
          })
        }
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={editData.status}
        onChange={(e) =>
          setEditData({
            ...editData,
            status: e.target.value,
          })
        }
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400 md:col-span-2"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <textarea
        rows={4}
        value={editData.description}
        onChange={(e) =>
          setEditData({
            ...editData,
            description: e.target.value,
          })
        }
        placeholder="Description"
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400 md:col-span-2"
      />
    </div>

    <div className="mt-6 flex justify-end gap-3">
      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="rounded-xl border border-slate-600 px-5 py-2 font-semibold text-slate-300 transition hover:bg-slate-800"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={handleSaveEdit}
        disabled={isSaving}
        className="rounded-xl bg-cyan-500 px-6 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </div>
)}
          {/* Body */}

          <div className="grid gap-6 p-6 md:grid-cols-2">

            <div className="rounded-2xl bg-slate-800/60 p-5">
              <div className="flex items-center gap-2">
                <FolderOpen size={18} className="text-cyan-400" />
                <p className="text-slate-400">Category</p>
              </div>

              <h3 className="mt-2 text-lg text-white">
                {complaint.category}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-800/60 p-5">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-orange-400" />
                <p className="text-slate-400">Priority</p>
              </div>

              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                  complaint.priority === "High"
                    ? "bg-red-500/20 text-red-400"
                    : complaint.priority === "Medium"
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                {complaint.priority}
              </span>
            </div>

            <div className="rounded-2xl bg-slate-800/60 p-5">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-400" />
                <p className="text-slate-400">Status</p>
              </div>

              <h3 className="mt-2 text-lg text-white">
                {complaint.status}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-800/60 p-5">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-cyan-400" />
                <p className="text-slate-400">Location</p>
              </div>

              <h3 className="mt-2 text-lg text-white">
                {complaint.location}
              </h3>
            </div>

          </div>
{/* Complaint Image */}

{complaint.image && (
  <div className="border-t border-slate-800 p-6">
    <div className="flex items-center gap-2">
      <FileText size={18} className="text-cyan-400" />

      <h3 className="text-lg font-semibold text-white">
        Complaint Evidence
      </h3>
    </div>

    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
      <img
  src={`http://localhost:5000${complaint.image}`}
  alt="Complaint Evidence"
  onClick={() => setIsImageOpen(true)}
  className="h-72 w-full cursor-zoom-in object-cover transition duration-500 hover:scale-105"
/>
    </div>
  </div>
)}
          {/* Description */}

          <div className="border-t border-slate-800 p-6">

            <div className="flex items-center gap-2">
              <FileText size={18} className="text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">
                Description
              </h3>
            </div>

            <p className="mt-4 leading-8 text-slate-300">
              {complaint.description}
            </p>

          </div>

          {/* Footer */}

<div className="flex items-center justify-between border-t border-slate-800 p-6">

  <div className="flex flex-col">

    <div className="flex items-center gap-2 text-slate-400">
      <CalendarDays size={18} />
      <span>
        {new Date(complaint.createdAt).toLocaleString()}
      </span>
    </div>

    <p className="mt-2 text-xs text-slate-500">
      Complaint ID: {complaint._id}
    </p>

  </div>

  <div className="flex gap-3">

    <button
  onClick={() => setIsEditing(true)}
  className="rounded-xl border border-cyan-500 px-5 py-2 font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-500 hover:text-black"
>
  ✏️ Edit
</button>

    <button
  onClick={handleDeleteComplaint}
  disabled={isDeleting}
  className="rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  {isDeleting ? "Deleting..." : "🗑 Delete"}
</button>

    <button
      onClick={onClose}
      className="rounded-xl bg-cyan-500 px-6 py-2 font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-400"
    >
      Close
    </button>

  </div>

</div>
        </motion.div>
      </motion.div>
      {isImageOpen && (
  <motion.div
   key="image-lightbox"
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setIsImageOpen(false)}
  >
    <button
      onClick={() => setIsImageOpen(false)}
      className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-red-500"
    >
      <X className="h-6 w-6" />
    </button>

    <motion.img
      src={`http://localhost:5000${complaint.image}`}
      alt="Complaint Evidence Fullscreen"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.stopPropagation()}
      className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl"
    />
  </motion.div>
)}
    </AnimatePresence>
  );
}