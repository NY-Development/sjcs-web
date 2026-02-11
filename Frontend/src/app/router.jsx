import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "../features/auth/ProtectedRoute.jsx";

const LandingPage = lazy(() => import("../pages/LandingPage.jsx"));
const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const RoleSelectionPage = lazy(() => import("../pages/RoleSelectionPage.jsx"));
const PortalHome = lazy(() => import("../pages/PortalHome.jsx"));
const StudentDashboardPage = lazy(() => import("../pages/StudentDashboardPage.jsx"));
const TeacherDashboardPage = lazy(() => import("../pages/TeacherDashboardPage.jsx"));
const AdminDashboardPage = lazy(() => import("../pages/AdminDashboardPage.jsx"));
const ParentDashboardPage = lazy(() => import("../pages/ParentDashboardPage.jsx"));
const StudentGradesPage = lazy(() => import("../pages/StudentGradesPage.jsx"));
const AttendanceCalendarPage = lazy(() => import("../pages/AttendanceCalendarPage.jsx"));
const PaymentsFinancePage = lazy(() => import("../pages/PaymentsFinancePage.jsx"));

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/role-selection", element: <RoleSelectionPage /> },
  {
    element: <ProtectedRoute allowedRoles={["Admin", "Teacher", "Student", "Parent"]} />,
    children: [
      { path: "/portal", element: <PortalHome /> },
      { path: "/student", element: <StudentDashboardPage /> },
      { path: "/teacher", element: <TeacherDashboardPage /> },
      { path: "/admin", element: <AdminDashboardPage /> },
      { path: "/parent", element: <ParentDashboardPage /> },
      { path: "/grades", element: <StudentGradesPage /> },
      { path: "/attendance", element: <AttendanceCalendarPage /> },
      { path: "/payments", element: <PaymentsFinancePage /> }
    ]
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;
