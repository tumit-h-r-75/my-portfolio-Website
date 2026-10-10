import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SiteLoader from "../components/SiteLoader/SiteLoader";

// Pages that are not on the home screen load on demand (separate JS chunks),
// so visitors only download the code for the page they actually open.
const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));
const Login = lazy(() => import("../pages/Dashboard/Login"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const DashboardLayout = lazy(() => import("../Layouts/DashboardLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const ManageProjects = lazy(() => import("../pages/Dashboard/Projects"));
const ManageSkills = lazy(() => import("../pages/Dashboard/Skills"));
const MediaLibrary = lazy(() => import("../pages/Dashboard/Media"));

const PageFallback = () => <SiteLoader size="lg" messages={["Loading page", "Preparing layout"]} />;

const withSuspense = (element) => <Suspense fallback={<PageFallback />}>{element}</Suspense>;

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
        element: withSuspense(<Projects />),
      },
      {
        path: "/projects/:id",
        element: withSuspense(<ProjectDetails />),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/tumit/75",
    element: withSuspense(
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // This makes it the default child route
        element: withSuspense(<Dashboard />),
      },
      {
        path: "projects",
        element: withSuspense(<ManageProjects />),
      },
      {
        path: "skills",
        element: withSuspense(<ManageSkills />),
      },
      {
        path: "media",
        element: withSuspense(<MediaLibrary />),
      },
    ]
  },
]);

export default router;
