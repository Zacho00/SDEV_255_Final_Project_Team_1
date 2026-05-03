const BASE_URL = 'https://sdev255-backend.onrender.com/api';

// --Authentication--
export function getToken() {
    return localStorage.getItem('token');
}

export function saveToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}   

export function isLoggedIn() {
    return !!getToken();
}

// API calls

export async function login(name, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
    });
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    const data = await response.json();
    saveToken(data.token);
    return data;
}

export async function register(name, password, role) {
    const response = await fetch(`${BASE_URL}/auth/register`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, role }),
    });

    if (!response.ok) {
        throw new Error('Failed to register');
    }

    return response.json();

}



// --------------
export async function getCourses() {

    const response = await fetch(`${BASE_URL}/courses`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
}


export async function getCourseById(courseId) {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch course');
    }
    return response.json();
}

export async function createCourse(courseData) {
    const response = await fetch(`${BASE_URL}/courses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
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
            'Authorization': `Bearer ${getToken()}`,
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
        headers: {
            'Authorization': `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete course');
    }
}

export function getRole() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
}