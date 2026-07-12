// const nodemailer = require("nodemailer");
// const Contact = require("../models/Contact");

// function makeTransport() {
//   return nodemailer.createTransport({
//     host: process.env.MAIL_HOST || "smtp.gmail.com",
//     port: Number(process.env.MAIL_PORT) || 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//       user: (process.env.MAIL_USER || "").trim(),
//       pass: (process.env.MAIL_PASS || "").replace(/\s+/g, ""),
//     },
//   });
// }

// exports.submitContactForm = async (req, res) => {
//   try {
//     const { name, email, phone, city, state, message } = req.body;

//     // ✅ Save to MongoDB
//     const newContact = new Contact({ name, email, phone, city, state, message });
//     await newContact.save();

//     // ✅ Send email
//     const transporter = makeTransport();
//     await transporter.sendMail({
//       from: process.env.MAIL_FROM || `"Vaanya Clinic" <${process.env.MAIL_USER}>`,
//       to: process.env.MAIL_TO || process.env.MAIL_USER,
//       subject: "New Contact Form Submission",
//       text: `
// Name: ${name}
// Email: ${email}
// Phone: ${phone || "-"}
// City: ${city || "-"}
// State: ${state || "-"}
// Message:
// ${message || "-"}
//       `.trim(),
//     });

//     // ✅ Success response
//     return res.render("contact", {
//       title: "Contact Us – Vaanya Clinic",
//       success: true,
//     });
//   } catch (err) {
//     console.error("Contact submit error:", err);
//     return res.render("contact", {
//       title: "Contact Us – Vaanya Clinic",
//       success: false,
//     });
//   }
// };
