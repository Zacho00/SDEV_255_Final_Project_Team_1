import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Final Project SDEV255</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/viewcourses">View Courses</Link></li>
        <li><Link to="/createcourses">Create a Course</Link></li>
      </ul>
    </nav>
  );
}