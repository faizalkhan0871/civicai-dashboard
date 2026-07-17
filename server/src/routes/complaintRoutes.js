const {
  complaintValidation,
} = require("../validators/complaintValidator");

const validate = require("../middleware/validationMiddleware");
const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createComplaint,
  getComplaints,
  updateComplaint,
  updateComplaintStatus,
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
router.post(
  "/",
  protect,
  complaintValidation,
  validate,
  createComplaint
);

// Update Complaint
router.put(
  "/:id",
  protect,
  complaintValidation,
  validate,
  updateComplaint
);
router.patch(
  "/:id/status",
  protect,
  updateComplaintStatus
);

// Delete Complaint
router.delete("/:id", protect, deleteComplaint);

module.exports = router;