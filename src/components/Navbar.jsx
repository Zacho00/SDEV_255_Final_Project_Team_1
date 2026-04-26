import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand"></div>
      <ul className="navbar-links">
        <li><Link to="/SDEV_255_Final_Project_Team_1/">Home</Link></li>
        <li><Link to="/viewcourses">View Courses</Link></li>
        <li><Link to="/createcourses">Create a Course</Link></li>
      </ul>
    </nav>
  );
}