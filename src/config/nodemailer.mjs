import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.APP_PASSWORD,
  },
});

export const mailOptions = {
  from: {
    name: "Stockmate Alerts",
    address: process.env.GMAIL_ID,
  },
  to: ["nyalik.marvoh@gmail.com"],
  subject: "Products below stock threshold",
  html: "<h3>Hello from Stockmate</h3>"
};

export const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!!");
  } catch (error) {
    console.error(error);
  }
};
