const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  getDashboardStats,
  getAnalytics,
  getRecentActivity,
} = require("../controllers/complaintController");
const router = express.Router();

// Dashboard Stats
router.get("/stats", protect, getDashboardStats);

// Analytics
router.get("/analytics", protect, getAnalytics);
router.get("/activity", protect, getRecentActivity);
// Get All Complaints
router.get("/", protect, getComplaints);

// Create Complaint
router.post("/", protect, createComplaint);

// Update Complaint
router.put("/:id", protect, updateComplaint);

// Delete Complaint
router.delete("/:id", protect, deleteComplaint);

module.exports = router;