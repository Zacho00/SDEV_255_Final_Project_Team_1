import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCourses, deleteCourse, getRole, isLoggedIn } from "../api";

export default function ViewCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const isTeacher = getRole() === "teacher";

    useEffect(() => {
        getCourses()
            .then((data) => setCourses(data))
            .catch(() => setError("Failed to load courses"))
            .finally(() => setLoading(false));
    }, []);

    async function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this course?")) return;
        try {
            await deleteCourse(id);
            setCourses((prev) => prev.filter((c) => c.id !== id));
        } catch {
            alert("Failed to delete course.");
        }
    }

    if (!isLoggedIn()) return (
        <div className="create-form-wrapper">
            <div className="create-form-card" style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#f5c518', marginBottom: '1rem' }}>Access Denied</h2>
                <p style={{ color: '#888', marginBottom: '1.5rem' }}>You need to log in to view courses.</p>
                <button type="submit" onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        </div>
    );

    if (loading) return (
        <div className="create-form-wrapper">
            <div className="create-form-card" style={{ textAlign: 'center' }}>
                <p style={{ color: '#888' }}>Loading courses...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="create-form-wrapper">
            <div className="create-form-card" style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#f5c518', marginBottom: '1rem' }}>Something went wrong</h2>
                <p className="error">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="course-list-wrapper">
            <div style={{ width: "100%", maxWidth: "900px" }}>
                <h2 className="courses-header">Available Courses</h2>
                <ul className="course-list">
                    {courses.map((course) => (
                        <li key={course.id}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            {isTeacher && (
                                <>
                                    <button type="button" onClick={() => navigate(`/editcourse/${course.id}`)}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn-danger" onClick={() => handleDelete(course.id)}>
                                        Delete
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}