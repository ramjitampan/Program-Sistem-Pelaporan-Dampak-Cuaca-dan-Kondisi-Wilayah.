const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function kirimEmail({ ke, subjek, isi }) {
  return transporter.sendMail({
    from: `"SIPACU" <${process.env.EMAIL_USER}>`,
    to: ke,
    subject: subjek,
    html: isi
  });
}

module.exports = kirimEmail;
