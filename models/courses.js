// In-memory "database" for now

let courses = [
  { id: 1, title: "Intro to Web Dev", description: "HTML, CSS, JS basics" },
  { id: 2, title: "React Basics", description: "Components, props, state" }
];

let nextId = 3;

export function getAllCourses() {
  return courses;
}

export function getCourseById(id) {
  return courses.find(c => c.id === id);
}

export function createCourse(data) {
  const course = { id: nextId++, ...data };
  courses.push(course);
  return course;
}

export function updateCourse(id, data) {
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return null;
  courses[index] = { ...courses[index], ...data };
  return courses[index];
}

export function deleteCourse(id) {
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return false;
  courses.splice(index, 1);
  return true;
}
