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
const MockExamsPortalPage = lazy(() => import("../pages/MockExamsPortalPage.jsx"));
const MockExamResultsPage = lazy(() => import("../pages/MockExamResultsPage.jsx"));
const LearningMaterialsLibraryPage = lazy(() => import("../pages/LearningMaterialsLibraryPage.jsx"));
const UploadLearningMaterialsPage = lazy(() => import("../pages/UploadLearningMaterialsPage.jsx"));
const UserManagementPage = lazy(() => import("../pages/UserManagementPage.jsx"));
const AdminSystemConfigurationPage = lazy(() => import("../pages/AdminSystemConfigurationPage.jsx"));
const EmptyStateGradesPage = lazy(() => import("../pages/EmptyStateGradesPage.jsx"));
const EmptyStateMaterialsPage = lazy(() => import("../pages/EmptyStateMaterialsPage.jsx"));
const EmptyStateNotificationsPage = lazy(() => import("../pages/EmptyStateNotificationsPage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx"));

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
      { path: "/payments", element: <PaymentsFinancePage /> },
      { path: "/mock-exams", element: <MockExamsPortalPage /> },
      { path: "/mock-exams/results", element: <MockExamResultsPage /> },
      { path: "/materials", element: <LearningMaterialsLibraryPage /> },
      { path: "/materials/upload", element: <UploadLearningMaterialsPage /> },
      { path: "/admin/users", element: <UserManagementPage /> },
      { path: "/admin/configuration", element: <AdminSystemConfigurationPage /> },
      { path: "/empty/grades", element: <EmptyStateGradesPage /> },
      { path: "/empty/materials", element: <EmptyStateMaterialsPage /> },
      { path: "/empty/notifications", element: <EmptyStateNotificationsPage /> }
    ]
  },
  { path: "*", element: <NotFoundPage /> }
]);

export const AppRouter = () => <RouterProvider router={router} />;
