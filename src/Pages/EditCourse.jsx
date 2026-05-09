import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getCourseById, updateCourse } from "../api";

export default function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [courseNumber, setCourseNumber] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subjectArea, setSubjectArea] = useState("");
    const [credits, setCredits] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCourseById(id)
            .then((course) => {
                setCourseNumber(course.courseNumber || "");
                setTitle(course.title || "");
                setDescription(course.description || "");
                setSubjectArea(course.subjectArea || "");
                setCredits(course.credits || "");
            })
            .catch(() => setError("Could not load course."))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await updateCourse(id, { courseNumber, title, description, subjectArea, credits });
            navigate("/mycourses");
        } catch {
            setError("Failed to update course.");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return (
        <div className="create-form-wrapper">
            <div className="create-form-card" style={{ textAlign: 'center' }}>
                <p style={{ color: '#888' }}>Loading course...</p>
            </div>
        </div>
    );

    return (
        <div className="create-form-wrapper">
            <div className="create-form-card">
                <h1>Edit Course</h1>
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
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button type="button" onClick={() => navigate("/mycourses")}>
                            Cancel
                        </button>
                        <button type="submit" disabled={submitting}>
                            {submitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}