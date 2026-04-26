const BASE_URL = 'https://dashboard.render.com/web/srv-d7n14ou8bjmc738jhur0/deploys/dep-d7n15pl7vvec738s2bog?r=2026-04-26%4013%3A27%3A11%7E2026-04-26%4013%3A29%3A39';

export async function getCourses() {
    const response = await fetch(`${BASE_URL}/courses`);
    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
}

export async function getCourseById(courseId) {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch course');
    }
    return response.json();
}

export async function createCourse(courseData) {
    const response = await fetch(`${BASE_URL}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });
    if (!response.ok) {
        throw new Error('Failed to create course');
    }
    return response.json();
}

export async function updateCourse(courseId, courseData) {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });
    if (!response.ok) {
        throw new Error('Failed to update course');
    }
    return response.json();
}

export async function deleteCourse(courseId) {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete course');
    }
}