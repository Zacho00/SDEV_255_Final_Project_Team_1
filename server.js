import express from "express";
import cors from "cors";
import coursesRouter from "./routes/courses.js";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'https://zacho00.github.io'
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running for Final Project");
});

app.use("/api/courses", coursesRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
