import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route
            path="/projects/:id"
            element={<ProjectDetailPage />}
          />
		  <Route path="/dashboard" element={<DashboardPage />} />
		  <Route path="/login" element={<LoginPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
