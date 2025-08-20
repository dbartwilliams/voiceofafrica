// testMail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function testMail() {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.voiceofafrica.co.uk", // or smtp.hostinger.com
      port: 465, // 465 for SSL, 587 for TLS
      secure: true, // true for port 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"SMTP Test" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // send to yourself
      subject: "Hostinger SMTP Test",
      text: "If you get this email, SMTP works perfectly ✅",
    });

    console.log("Test email sent:", info.messageId);
  } catch (err) {
    console.error("SMTP test failed:", err);
  }
}

testMail();
