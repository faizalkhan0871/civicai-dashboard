"use client";

import { useState } from "react";
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
}

export default function ComplaintModal({
  complaint,
  onClose,
}: ComplaintModalProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);

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
      className="rounded-xl border border-cyan-500 px-5 py-2 font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-500 hover:text-black"
    >
      ✏️ Edit
    </button>

    <button
      className="rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
    >
      🗑 Delete
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