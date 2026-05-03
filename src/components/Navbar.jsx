import { Link, useNavigate } from "react-router";
import { isLoggedIn, removeToken, getRole } from "../api";

export default function Navbar() {
  const navigate = useNavigate();
  const isTeacher = getRole() === "teacher";

  function handleLogout() {
    removeToken();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand"></div>
      <ul className="navbar-links">
        <li><Link to="/SDEV_255_Final_Project_Team_1/">Home</Link></li>
        <li><Link to="/viewcourses">View Courses</Link></li>
        {isTeacher && <li><Link to="/createcourses">Create a Course</Link></li>}
        {isLoggedIn()
          ? <li><button onClick={handleLogout}>Logout</button></li>
          : <li><Link to="/login">Login</Link></li>
        }
      </ul>
    </nav>
  );
}