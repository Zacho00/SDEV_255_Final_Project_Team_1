import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

// Ensure a student can only enroll in a course once
enrollmentSchema.index({ studentName: 1, courseId: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export async function getEnrollmentsByStudent(studentName) {
    return Enrollment.find({ studentName }).populate('courseId');
}

export async function enrollStudent(studentName, courseId) {
    try {
        const enrollment = new Enrollment({ studentName, courseId });
        await enrollment.save();
        return enrollment;
  } catch (err) {
    // duplicate key error
    if (err.code === 11000) return null;
    throw err;
  }
}

export async function dropEnrollment(studentName, courseId) {
  const result = await Enrollment.findOneAndDelete({ studentName, courseId });
  return !!result;
}

export default Enrollment;