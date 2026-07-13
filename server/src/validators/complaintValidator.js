const { body } = require("express-validator");

exports.complaintValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),

  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Resolved"])
    .withMessage("Invalid status"),
];