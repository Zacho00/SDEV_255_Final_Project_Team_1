import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from "../models/courses.js";

const router = express.Router();

// GET /api/courses
router.get("/", (req, res) => {
  res.json(getAllCourses());
});

// GET /api/courses/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const course = getCourseById(id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
});

// POST /api/courses
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const course = createCourse({ title, description });
  res.status(201).json(course);
});

// PUT /api/courses/:id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const course = updateCourse(id, req.body);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
});

// DELETE /api/courses/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const ok = deleteCourse(id);
  if (!ok) return res.status(404).json({ message: "Course not found" });
  res.status(204).send();
});

export default router;
