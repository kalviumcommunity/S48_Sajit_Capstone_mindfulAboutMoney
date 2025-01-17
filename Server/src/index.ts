import express, { Express } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import financialRecordRouter from "./routes/financial-records";
// import contactRouter from "./routes/contact";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

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

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB 📦");
    app.use("/financial-records", financialRecordRouter);
    // app.use("/contact", contactRouter);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port} 🚀`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
