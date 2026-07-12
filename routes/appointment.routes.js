// const express = require("express");
// const router = express.Router();
// const { body } = require("express-validator");
// const { createAppointment } = require("../controllers/appointment.controller");

// const formRules = [
//   body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 80 }),
//   body("phone")
//     .trim()
//     .notEmpty().withMessage("Phone is required")
//     .matches(/^[0-9+\-\s]{7,20}$/)
//     .withMessage("Enter a valid phone number"),
//   body("email").trim().isEmail().withMessage("Valid email required").normalizeEmail(),
//   body("city").trim().notEmpty().withMessage("City is required").isLength({ max: 80 }),
//   body("state").trim().notEmpty().withMessage("State is required").isLength({ max: 80 }),
// ];

// router.post("/appointment", formRules, createAppointment);

// module.exports = router;
