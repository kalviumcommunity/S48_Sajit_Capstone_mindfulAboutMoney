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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const financial_records_1 = __importDefault(require("./routes/financial-records"));
const contact_1 = __importDefault(require("./routes/contact"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const UPTIME_ROBOT_API_KEY = process.env.UPTIME_ROBOT_API_KEY || "";
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const mongoURI = process.env.MONGO_URI || "";
if (!mongoURI) {
    console.error("Error: MongoDB URI is missing. Please check your environment variables.");
    process.exit(1);
}
// Add some logging to verify environment variables
console.log("MongoDB URI:", mongoURI.substring(0, 20) + "...");
console.log("Resend API Key:", process.env.RESEND_API_KEY ? "Present" : "Missing");
// Route to fetch uptime status from UptimeRobot
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://api.uptimerobot.com/v2/getMonitors", {
            api_key: process.env.UPTIME_ROBOT_API_KEY,
            format: "json",
        });
        const monitors = response.data.monitors.map((monitor) => ({
            name: monitor.friendly_name,
            status: monitor.status,
            uptime: monitor.all_time_uptime_ratio,
        }));
        res.json({ monitors });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch uptime status" });
    }
}));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log("Connected to MongoDB 📦");
    app.use("/financial-records", financial_records_1.default);
    app.use("/contact", contact_1.default);
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port} 🚀`);
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
