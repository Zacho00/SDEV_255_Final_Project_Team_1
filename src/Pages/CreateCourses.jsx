import { useState } from "react";
import { useNavigate } from "react-router";
import { createCourse } from "../api";

export default function CreateCourses() {
    const [courseNumber, setCourseNumber] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subjectArea, setSubjectArea] = useState("");
    const [credits, setCredits] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await createCourse({ courseNumber, title, description, subjectArea, credits });
            navigate("/viewcourses");
        } catch {
            setError("Failed to create course. Is the backend running?");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="create-form-wrapper">
            <div className="create-form-card">
                <h1>Create a Course</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="courseNumber">Course Number *</label>
                        <input
                            id="courseNumber"
                            type="text"
                            value={courseNumber}
                            onChange={(e) => setCourseNumber(e.target.value)}
                            placeholder="e.g. CS101"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="title">Course Title *</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Introduction to JavaScript"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of the course..."
                            rows={4}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="subjectArea">Subject Area *</label>
                        <input
                            id="subjectArea"
                            type="text"
                            value={subjectArea}
                            onChange={(e) => setSubjectArea(e.target.value)}
                            placeholder="e.g. Computer Science"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="credits">Credits *</label>
                        <input
                            id="credits"
                            type="number"
                            min="1"
                            max="6"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                            placeholder="e.g. 3"
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button type="button" onClick={() => navigate("/viewcourses")}>
                            Cancel
                        </button>
                        <button type="submit" disabled={submitting}>
                            {submitting ? "Creating..." : "Create Course"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}