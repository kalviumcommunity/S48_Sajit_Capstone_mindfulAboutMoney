"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resend_1 = require("resend");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const contactRouter = express_1.default.Router();
// Safely check for API key
const RESEND_API_KEY = process.env.RESEND_API_KEY;
console.log("Resend API Key:", RESEND_API_KEY);
// Only create Resend instance if API key exists
const resend = RESEND_API_KEY ? new resend_1.Resend(RESEND_API_KEY) : null;
const sendEmailHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { data, error } = yield resend.emails.send({
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
    }
    catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({
            error: "Failed to send email",
            details: error instanceof Error ? error.message : error,
        });
    }
});
contactRouter.post("/send", sendEmailHandler);
exports.default = contactRouter;
