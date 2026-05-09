import express from "express";
import { requireRole } from "../middleware/authMiddleware.js";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByTeacher
} from "../models/courses.js";

const router = express.Router();

// GET /api/courses - any logged in user
router.get("/", async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

// GET /api/courses/search - any logged in user (at least one query param required)
router.get("/search", async (req, res) => {
  const { courseNumber, title, subjectArea } = req.query;

  if (!courseNumber && !title && !subjectArea) {
    return res.status(400).json({ message: "At least one search field is required" });
  }

  try {
    let results = await getAllCourses();

    if (courseNumber) {
      results = results.filter(c =>
        c.courseNumber.toLowerCase().includes(courseNumber.toLowerCase())
      );
    }

    if (title) {
      results = results.filter(c =>
        c.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (subjectArea) {
      results = results.filter(c =>
        c.subjectArea.toLowerCase().includes(subjectArea.toLowerCase())
      );
    }

    res.json(results);
  } catch {
    res.status(500).json({ message: "Search failed" });
  }
});

// GET /api/courses/my - teachers only, returns only their own courses
router.get("/my", requireRole("teacher"), async (req, res) => {
  try {
    const courses = await getCoursesByTeacher(req.user.name);
    res.json(courses);
  } catch {
    res.status(500).json({ message: "Failed to fetch your courses" });
  }
});

// GET /api/courses/:id - any logged in user (for the edit forms)
router.get("/:id", async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to fetch course" });
  }
});

// POST /api/courses - teachers only
router.post("/", requireRole("teacher"), async (req, res) => {
  const { courseNumber, title, description, subjectArea, credits } = req.body;

  if (!courseNumber || !title || !description || !subjectArea || !credits) {
    return res.status(400).json({ message: "All fields are required: courseNumber, title, description, subjectArea, credits" });
  }

  try {
    const course = await createCourse({
      courseNumber,
      title,
      description,
      subjectArea,
      credits: Number(credits),
      createdBy: req.user.name
    });
    res.status(201).json(course);
  } catch {
    res.status(500).json({ message: "Failed to create course" });
  }
});

// PUT /api/courses/:id - teachers only, owned courses only
router.put("/:id", requireRole("teacher"), async (req, res) => {
  try {
    const existing = await getCourseById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Course not found" });

    if (existing.createdBy !== req.user.name) {
      return res.status(403).json({ message: "You can only edit courses you created" });
    }

    const { courseNumber, title, description, subjectArea, credits } = req.body;
    const course = await updateCourse(req.params.id, {
      courseNumber,
      title,
      description,
      subjectArea,
      credits: Number(credits)
    });

    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to update course" });
  }
});

// DELETE /api/courses/:id - teachers only, owned courses only
router.delete("/:id", requireRole("teacher"), async (req, res) => {
  try {
    const existing = await getCourseById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Course not found" });

    if (existing.createdBy !== req.user.name) {
      return res.status(403).json({ message: "You can only delete courses you created" });
    }

    await deleteCourse(req.params.id);
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Failed to delete course" });
  }
});

export default router;