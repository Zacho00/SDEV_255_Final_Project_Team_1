import { useState } from "react";
import { useNavigate } from "react-router";
import { createCourse } from "../api";

export default function CreateCourses() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await createCourse({ title, description });
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
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of the course..."
                            rows={4}
                        />
                    </div>
                    <button type="button" onClick={() => navigate("/viewcourses")}>
                        Cancel
                    </button>
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Creating..." : "Create Course"}
                    </button>
                </form>
            </div>
        </div>
    );
}