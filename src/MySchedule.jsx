import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getMySchedule, dropCourse, getRole, isLoggedIn } from '../api';

export default function MySchedule() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isStudent = getRole() === 'student';

    useEffect(() => {
        if (!isLoggedIn() || !isStudent) return;
        async function fetchSchedule() {
            try {
                const data = await getMySchedule();
                setCourses(data);
            } catch (err) {
                setError('Failed to load your schedule.');
            } finally {
                setLoading(false);
            }
        }
        fetchSchedule();
    }, []);

    async function handleDrop(courseId) {
        if (!window.confirm('Drop this course from your schedule?')) return;
        try {
            await dropCourse(courseId);
            setCourses((prev) => prev.filter((c) => c._id !== courseId));
        } catch {
            alert('Failed to drop course.');
        }
    }

    if (!isLoggedIn() || !isStudent) return (
        <div className="create-form-wrapper">
            <div className="create-form-card" style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#f5c518', marginBottom: '1rem' }}>Access Restricted</h2>
                <p style={{ color: '#888', marginBottom: '1.5rem' }}>This page is for students only.</p>
                <button type="button" onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        </div>
    );

    if (loading) return (
        <div className="create-form-wrapper">
            <div className="create-form-card" style={{ textAlign: 'center' }}>
                <p style={{ color: '#888' }}>Loading your schedule...</p>
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
                <h2 className="courses-header">My Schedule</h2>
                {courses.length === 0 ? (
                    <div className="create-form-card" style={{ textAlign: 'center' }}>
                        <p style={{ color: '#888', marginBottom: '1.5rem' }}>
                            You haven't enrolled in any courses yet.
                        </p>
                        <button type="button" onClick={() => navigate('/searchcourses')}>
                            Find Courses
                        </button>
                    </div>
                ) : (
                    <ul className="course-list">
                        {courses.map((course) => (
                            <li key={course._id}>
                                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.25rem' }}>
                                    {course.courseNumber} · {course.subjectArea} · {course.credits} credits
                                </p>
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <div style={{ marginTop: '0.75rem' }}>
                                    <button
                                        type="button"
                                        className="btn-danger"
                                        onClick={() => handleDrop(course._id)}
                                    >
                                        Drop Course
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