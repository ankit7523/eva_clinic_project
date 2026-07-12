const { validationResult } = require("express-validator");
const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: (process.env.MAIL_USER || "").trim(),
      pass: (process.env.MAIL_PASS || "").replace(/\s+/g, ""),
    },
  });
}

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, city, state, message } = req.body;

    // ✅ Save in MongoDB
    const newContact = new Contact({ name, email, phone, city, state, message });
    await newContact.save();

    // ✅ Send mail
    const transporter = makeTransport();
    await transporter.sendMail({
      from: process.env.MAIL_FROM || `"Vaanya Clinic" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      subject: "New Contact Form Submission",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
City: ${city || "-"}
State: ${state || "-"}
Message:
${message || "-"}
      `.trim(),
    });

    // ✅ Render success
    return res.render("contact", {
      title: "Contact Us – Vaanya Clinic",
      success: true,
    });
  } catch (err) {
    console.error("Contact submit error:", err);
    return res.render("contact", {
      title: "Contact Us – Vaanya Clinic",
      success: false,
    });
  }
};




exports.createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.array() });
  }

  const { name, phone, email, city, state } = req.body;

  try {
    const appointment = await Appointment.create({ name, phone, email, city, state });
    return res.status(201).json({ ok: true, message: "Appointment booked successfully!", data: appointment });
  } catch (err) {
    console.error("Error saving appointment:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
