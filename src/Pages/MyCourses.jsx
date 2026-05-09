import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getMyCourses, deleteCourse, getRole, isLoggedIn } from '../api';

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isTeacher = getRole() === 'teacher';

useEffect(() => {
    if (!isLoggedIn() || !isTeacher) return;
    async function fetchCourses() {
        try {
            const data = await getMyCourses();
            setCourses(data);
        } catch (err) {
            setError('Failed to load your courses.');
        } finally {
            setLoading(false);
        }
    }
    fetchCourses();
}, []);

    async function handleDelete(id) {
        if (!window.confirm('Delete this course?')) return;
        try {
            await deleteCourse(id);
            setCourses((prev) => prev.filter((c) => c.id !== id));
        } catch {
            alert('Failed to delete course.');
        }
    }

    if (!isLoggedIn() || !isTeacher) return (
        <div className="create-form-wrapper">
            <div className="create-form-card" style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#f5c518', marginBottom: '1rem' }}>Access Restricted</h2>
                <p style={{ color: '#888', marginBottom: '1.5rem' }}>This page is for teachers only.</p>
                <button type="button" onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        </div>
    );

    if (loading) return (
        <div className="create-form-wrapper">
            <div className="create-form-card" style={{ textAlign: 'center' }}>
                <p style={{ color: '#888' }}>Loading your courses...</p>
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
            <div style={{ width: '100%', maxWidth: '900px' }}>
                <h2 className="courses-header">My Courses</h2>
                {courses.length === 0 ? (
                    <div className="create-form-card" style={{ textAlign: 'center' }}>
                        <p style={{ color: '#888', marginBottom: '1.5rem' }}>
                            You haven't created any courses yet.
                        </p>
                        <button type="button" onClick={() => navigate('/createcourses')}>
                            Create a Course
                        </button>
                    </div>
                ) : (
                    <ul className="course-list">
                        {courses.map((course) => (
                            <li key={course.id}>
                                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.25rem' }}>
                                    {course.courseNumber} · {course.subjectArea} · {course.credits} credits
                                </p>
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                                    <button type="button" onClick={() => navigate(`/editcourse/${course.id}`)}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn-danger" onClick={() => handleDelete(course.id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}