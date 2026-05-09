import { useState } from "react";
import { searchCourses, enrollInCourse, getRole } from "../api";

export default function SearchCourses() {
    const [courseNumber, setCourseNumber] = useState('');
    const [title, setTitle] = useState('');
    const [subjectArea, setSubjectArea] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [enrollMessage, setEnrollMessage] = useState('');
    const isStudent = getRole() === 'student';

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setEnrollMessage('');

        if (!courseNumber && !title && !subjectArea) {
            setError('Please enter at least one search criteria.');
            return;
        }

        setLoading(true);
        try {
            const data = await searchCourses({ courseNumber, title, subjectArea });
            setResults(data);
        } catch (err) {
            setError('Failed to search courses. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    function handleClear() {
        setCourseNumber('');
        setTitle('');
        setSubjectArea('');
        setResults(null);
        setError('');
        setEnrollMessage('');
    }

    async function handleEnroll(courseId) {
        try {
            await enrollInCourse(courseId);
            setEnrollMessage('Successfully enrolled! Check My Schedule to view your courses.');
        } catch (err) {
            setEnrollMessage('Failed to enroll — you may already be in this course.');
        }
    }

    return (
        <div className="create-form-wrapper" style={{ flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div className="create-form-card">
                <h2 style={{ marginBottom: '1.5rem', color: '#f5c518' }}>Search Courses</h2>
                <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Fill in at least one field to search.
                </p>
                {error && <p className="error" style={{ marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="courseNumber">Course Number</label>
                        <input
                            type="text"
                            id="courseNumber"
                            value={courseNumber}
                            onChange={(e) => setCourseNumber(e.target.value)}
                            placeholder="e.g. CS101"
                        />
                    </div>
                    <div>
                        <label htmlFor="title">Course Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Intro to Web Dev"
                        />
                    </div>
                    <div>
                        <label htmlFor="subjectArea">Subject Area</label>
                        <input
                            type="text"
                            id="subjectArea"
                            value={subjectArea}
                            onChange={(e) => setSubjectArea(e.target.value)}
                            placeholder="e.g. Computer Science"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit">Search</button>
                        <button type="button" onClick={handleClear}
                            style={{ background: 'transparent', border: '1px solid #444', color: '#888' }}>
                            Clear
                        </button>
                    </div>
                </form>
            </div>

            {loading && (
                <div className="create-form-card" style={{ textAlign: 'center' }}>
                    <p style={{ color: '#888' }}>Searching...</p>
                </div>
            )}

            {enrollMessage && (
                <div className="create-form-card" style={{ textAlign: 'center' }}>
                    <p style={{ color: '#f5c518' }}>{enrollMessage}</p>
                </div>
            )}

            {results && !loading && (
                <div style={{ width: '100%', maxWidth: '900px' }}>
                    <h3 style={{ color: '#f5c518', marginBottom: '1rem' }}>
                        {results.length === 0 ? 'No courses found.' : `${results.length} course(s) found`}
                    </h3>
                    <ul className="course-list">
                        {results.map((course) => (
                            <li key={course._id}>
                                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.25rem' }}>
                                    {course.courseNumber} · {course.subjectArea} · {course.credits} credits
                                </p>
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                {isStudent && (
                                    <div style={{ marginTop: '0.75rem' }}>
                                        <button type="button" onClick={() => handleEnroll(course._id)}>
                                            Enroll
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}