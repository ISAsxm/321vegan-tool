import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isAuthenticated } = useCurrentUserContext();

  // 2. If there is no authenticated user, redirect to login
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  // 3. If there is an authenticated user, return children
  if (isAuthenticated) return children;

  return null;
}

export default ProtectedRoute;
