import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCourses, deleteCourse } from "../api";

export default function ViewCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCourses()
            .then((data) => {
                setCourses(data);
            })
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

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="course-list-wrapper">
            <div style={{ width: "100%", maxWidth: "900px" }}>
                <h2 className="courses-header">Available Courses</h2>
                <ul className="course-list">
                    {courses.map((course) => (
                        <li key={course.id}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <button type="button" onClick={() => navigate(`/editcourse/${course.id}`)}>
                                Edit
                            </button>
                            <button type="button" className="btn-danger" onClick={() => handleDelete(course.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>                                  
    );
}   

