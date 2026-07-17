const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

const validate = require("../middleware/validationMiddleware");
const express = require("express");

const {
  registerUser,
  loginUser,
  getSetupStatus,
} = require("../controllers/authController");

const router = express.Router();


router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);
router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);
router.get(
  "/setup-status",
  getSetupStatus
);
module.exports = router;