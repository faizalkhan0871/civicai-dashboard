const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  getDashboardStats,
} = require("../controllers/complaintController");

const router = express.Router();

// Dashboard Stats
router.get("/stats", protect, getDashboardStats);

// Get All Complaints
router.get("/", protect, getComplaints);

// Create Complaint
router.post("/", protect, createComplaint);

// Update Complaint
router.put("/:id", protect, updateComplaint);

// Delete Complaint
router.delete("/:id", protect, deleteComplaint);

module.exports = router;