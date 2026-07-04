const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  analyzeComplaints,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze", protect, analyzeComplaints);

module.exports = router;