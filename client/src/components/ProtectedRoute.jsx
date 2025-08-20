import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  if (role === "guest") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
