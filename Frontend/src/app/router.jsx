import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "../features/auth/ProtectedRoute.jsx";

const LandingPage = lazy(() => import("../pages/LandingPage.jsx"));
const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const RoleSelectionPage = lazy(() => import("../pages/RoleSelectionPage.jsx"));
const PortalHome = lazy(() => import("../pages/PortalHome.jsx"));

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/role-selection", element: <RoleSelectionPage /> },
  {
    element: <ProtectedRoute allowedRoles={["Admin", "Teacher", "Student", "Parent"]} />,
    children: [{ path: "/portal", element: <PortalHome /> }]
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;
