import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getCourseById, updateCourse } from "../api";

export default function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCourseById(id)
            .then((course) => {
                setTitle(course.title);
                setDescription(course.description || "");
            })
            .catch(() => setError("Could not load course."))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await updateCourse(id, { title, description });
            navigate("/viewcourses");
        } catch {
            setError("Failed to update course.");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="create-form-wrapper">
            <div className="create-form-card">
                <h1>Edit Course</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Course Title *</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <button type="button" onClick={() => navigate("/viewcourses")}>
                        Cancel
                    </button>
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}