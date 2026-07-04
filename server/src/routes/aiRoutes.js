const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  analyzeComplaints,
  chatWithCivicAI,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze", protect, analyzeComplaints);
router.post("/chat", protect, chatWithCivicAI);

module.exports = router;