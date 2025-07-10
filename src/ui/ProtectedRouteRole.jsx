import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useCurrentUser } from "@/features/authentication/useCurrentUser";

import FullPage from "./FullPage";
import Spinner from "./Spinner";

function ProtectedRouteRole({ children, role = "user" }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user roles
  const { isLoading, userRoles } = useCurrentUser();
  const hasAccess = userRoles?.includes(role);
  // 2. If user NOT has access, redirect to homepage
  useEffect(
    function () {
      if (!hasAccess && !isLoading) navigate("/");
    },
    [isLoading, hasAccess, navigate]
  );

  // 3. show spinner if loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If user has access, return children if exists otherwise return outlet
  if (hasAccess) return children ? children : <Outlet />;

  return null;
}

export default ProtectedRouteRole;
