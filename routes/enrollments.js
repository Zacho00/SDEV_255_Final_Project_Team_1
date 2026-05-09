import express from "express";
import { requireRole } from "../middleware/authMiddleware.js";
import { getEnrollmentsByStudent, enrollStudent, dropEnrollment } from "../models/enrollments.js";
import { getCourseById } from "../models/courses.js";

const router = express.Router();

// GET /api/enrollments/my - students only, returns full course objects
router.get("/my", requireRole("student"), async (req, res) => {
    try {
        const enrollments = await getEnrollmentsByStudent(req.user.name);
        const courses = enrollments.map(e => e.courseId); // populated by Mongoose
        res.json(courses);
    } catch {
        res.status(500).json({ message: "Failed to fetch your schedule" });
    }
});

// POST /api/enrollments - students only, enroll in a course
router.post("/", requireRole("student"), async (req, res) => {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ message: "courseId is required" });

    try {
        const course = await getCourseById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const enrollment = await enrollStudent(req.user.name, courseId);
        if (!enrollment) return res.status(409).json({ message: "Already enrolled in this course" });

        res.status(201).json({ message: "Enrolled successfully", course });
    } catch {
        res.status(500).json({ message: "Failed to enroll in course" });
    }
});

// DELETE /api/enrollments/:courseId - students only, drop a course
router.delete("/:courseId", requireRole("student"), async (req, res) => {
    try {
        const dropped = await dropEnrollment(req.user.name, req.params.courseId);
        if (!dropped) return res.status(404).json({ message: "Enrollment not found" });
        res.status(204).send();
    } catch {
        res.status(500).json({ message: "Failed to drop course" });
    }
});

export default router;