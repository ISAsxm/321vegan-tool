import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "@/contexts/CurrentUserContext";

function ProtectedRouteRole({ children, role = "user" }) {
  const navigate = useNavigate();
  // 1. Load the check haccess method
  const { hasAccess } = useCurrentUserContext();
  // 2. If user NOT has access, redirect to homepage
  useEffect(
    function () {
      if (!hasAccess(role)) navigate("/");
    },
    [hasAccess, role, navigate]
  );

  // 3. If user has access, return children if exists otherwise return outlet
  if (hasAccess) return children ? children : <Outlet />;

  return null;
}

export default ProtectedRouteRole;
