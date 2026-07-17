const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  analyzeComplaints,
  chatWithCivicAI,
  recommendComplaintPriority,
  analyzeComplaint,
} = require("../controllers/aiController");

const router = express.Router();
router.post(
  "/analyze-complaint",
  protect,
  analyzeComplaint
);
router.post("/analyze", protect, analyzeComplaints);
router.post("/chat", protect, chatWithCivicAI);
router.post(
  "/recommend-priority",
  protect,
  recommendComplaintPriority
);
module.exports = router;