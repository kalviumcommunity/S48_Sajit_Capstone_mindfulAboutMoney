import express, { Router, Request, Response } from "express";
import { Resend } from "resend";
import * as dotenv from "dotenv";

dotenv.config();

const contactRouter: Router = express.Router();

// Safely check for API key
const RESEND_API_KEY = process.env.RESEND_API_KEY;

console.log("Resend API Key:", RESEND_API_KEY); // Log the API key to ensure it's loaded correctly

// Only create Resend instance if API key exists
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

contactRouter.post(
  "/send",
  async (req: Request<{}, {}, ContactRequestBody>, res: Response) => {
    if (!resend) {
      console.error("Resend API key is missing or invalid");
      return res.status(500).json({
        error: "Email service is not configured. Please check your API key.",
      });
    }

    try {
      const { name, email, message } = req.body;

      // Send email via Resend
      const { data, error } = await resend.emails.send({
        from: "Mindful About Money <onboarding@resend.dev>",
        to: ["heysajit@gmail.com"],
        subject: "New Contact Form Submission",
        html: `
        <h1>New Message from Contact Form</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      });

      if (error) {
        console.error("Resend email error:", error); // Log detailed error
        return res.status(400).json({ error });
        console.log("Resend API Key:", process.env.RESEND_API_KEY); // This will print the actual key or undefined if not set
      }

      return res.status(200).json({ message: "Email sent successfully", data });
    } catch (error) {
      console.error("Email sending error:", error); // Log error details
      console.log("Resend API Key:", process.env.RESEND_API_KEY);
      return res.status(500).json({
        error: "Failed to send email",
        details: error instanceof Error ? error.message : error,
      });
    }
  }
);

export default contactRouter;
