import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getSchedule, removeCourseFromSchedule, isLoggedIn } from "../api";


export default function MySchedule() {
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    setSchedule(getSchedule());
  }, [navigate]);

  function handleRemove(courseId) {
    setSchedule(removeCourseFromSchedule(courseId));
  }

  if (!isLoggedIn()) return null;

  return (
    <div className="course-list-wrapper">
      <div style={{ width: "min(900px, 100%)", maxWidth: "900px", margin: "0 auto" }}>
        <h2 className="courses-header">My Schedule</h2>
        {schedule.length === 0 ? (
          <div className="create-form-card" style={{ width: "100%", maxWidth: '520px', margin: '0 auto', textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
            <p className="status-msg">No courses have been added to your schedule yet.</p>
            <button type="button" onClick={() => navigate("/viewcourses")}>Browse Courses</button>
          </div>
        ) : (
          <ul className="course-list">
            {schedule.map((course) => (
              <li key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button type="button" onClick={() => handleRemove(course.id)}>
                  Remove from Schedule
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
