import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/projects" className="app-logo">
            TaskFlow
          </Link>

          <nav className="app-nav">
		  <Link to="/dashboard">Dashboard</Link>
		  <Link to="/projects">Projets</Link>
		</nav>

        </div>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
