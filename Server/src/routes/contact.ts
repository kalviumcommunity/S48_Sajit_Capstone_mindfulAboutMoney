import express, { Router, Request, Response, RequestHandler } from "express";
import { Resend } from "resend";
import * as dotenv from "dotenv";

dotenv.config();

const contactRouter: Router = express.Router();

// Safely check for API key
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Only create Resend instance if API key exists
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

const sendEmailHandler: RequestHandler = async (
  req: Request<{}, {}, ContactRequestBody>,
  res: Response,
  next
): Promise<void> => {
  if (!resend) {
    console.error("Resend API key is missing or invalid");
    res.status(500).json({
      error: "Email service is not configured. Please check your API key.",
    });
    return;
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
      console.error("Resend email error:", error);
      res.status(400).json({ error });
      return;
    }

    res.status(200).json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: error instanceof Error ? error.message : error,
    });
  }
};

contactRouter.post("/send", sendEmailHandler);

export default contactRouter;
