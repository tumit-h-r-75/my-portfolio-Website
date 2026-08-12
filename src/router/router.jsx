import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProjectDetails from "../pages/ProjectDetails";
import ProjectsSection from "../components/ProjectsSection";
import Login from "../pages/Dashboard/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageProjects from "../pages/Dashboard/Projects";
import ManageSkills from "../pages/Dashboard/Skills";
import MediaLibrary from "../pages/Dashboard/Media";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/projects",
        element: <ProjectsSection />,
      },
      {
        path: "/projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/tumit/75",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // This makes it the default child route
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <ManageProjects />,
      },
      {
        path: "skills",
        element: <ManageSkills />,
      },
      {
        path: "media",
        element: <MediaLibrary />,
      },
    ]
  },
]);

export default router;
