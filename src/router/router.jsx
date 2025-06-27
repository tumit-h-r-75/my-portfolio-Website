import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import ProjectDetails from "../pages/ProjectDetails";

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
        element: <Projects />,
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
]);

export default router;
