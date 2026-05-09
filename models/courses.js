// mongodb schema and functions for courses

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseNumber: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  subjectArea: { type: String, required: true },
  credits: { type: Number, required: true },
  createdBy: { type: String, required: true }
});

const Course = mongoose.model("Course", courseSchema);

export async function getAllCourses() {
  return Course.find();
}

export async function getCourseById(id) {
  return Course.findById(id);
}

export async function createCourse(data) {
  const course = new Course(data);
  return course.save();
}

export async function updateCourse(id, data) {
  return Course.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteCourse(id) {
  const result = await Course.findByIdAndDelete(id);
  return !!result;
}

export async function getCoursesByTeacher(teacherName) {
  return Course.find({ createdBy: teacherName });
}

export default Course;