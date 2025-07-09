import express, { Express } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import financialRecordRouter from "./routes/financial-records";
import contactRouter from "./routes/contact";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

const UPTIME_ROBOT_API_KEY = process.env.UPTIME_ROBOT_API_KEY || "";

app.use(express.json());
app.use(cors());

const mongoURI: string = process.env.MONGO_URI || "";
if (!mongoURI) {
  console.error(
    "Error: MongoDB URI is missing. Please check your environment variables."
  );
  process.exit(1);
}

// Add some logging to verify environment variables
console.log("MongoDB URI:", mongoURI.substring(0, 20) + "...");
console.log(
  "Resend API Key:",
  process.env.RESEND_API_KEY ? "Present" : "Missing"
);

// Route to fetch uptime status from UptimeRobot
app.get("/health", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.uptimerobot.com/v2/getMonitors",
      {
        api_key: process.env.UPTIME_ROBOT_API_KEY,
        format: "json",
      }
    );

    const monitors = response.data.monitors.map((monitor: any) => ({
      name: monitor.friendly_name,
      status: monitor.status,
      uptime: monitor.all_time_uptime_ratio,
    }));

    res.json({ monitors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch uptime status" });
  }
});


app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB 📦");
    app.use("/financial-records", financialRecordRouter);
    app.use("/contact", contactRouter);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port} 🚀`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
