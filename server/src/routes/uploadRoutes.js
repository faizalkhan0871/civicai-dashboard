const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please select an image",
    });
  }

  res.status(200).json({
    message: "Image uploaded successfully",
    image: req.file.path,
  });
});

module.exports = router;