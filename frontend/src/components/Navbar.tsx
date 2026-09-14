import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        TaskFlow
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Projects
        </NavLink>
      </div>
    </nav>
  );
}
