import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../lib/authStore.js";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { accessToken, role } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    return <Navigate to="/role-selection" replace />;
  }

  return <Outlet />;
};
