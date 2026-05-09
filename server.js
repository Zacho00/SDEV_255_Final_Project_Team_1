import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import coursesRouter from "./routes/courses.js";
import authRouter from "./routes/auth.js";
import enrollmentsRouter from "./routes/enrollments.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors({
  origin: [
    'https://zacho00.github.io',
    'http://localhost:5173'
  ]
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running for Final Project");
});

app.use("/api/auth", authRouter);
app.use("/api/courses", authMiddleware, coursesRouter);
app.use("/api/enrollments", authMiddleware, enrollmentsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});