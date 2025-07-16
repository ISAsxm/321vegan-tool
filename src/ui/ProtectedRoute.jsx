import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/features/authentication/useCurrentUser";

import FullPage from "./FullPage";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isPending, user } = useCurrentUser();

  const isAuthenticated = user !== "undefined";

  // 2. If there is no authenticated user, redirect to login
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/login");
    },
    [isPending, isAuthenticated, navigate]
  );

  // 3. show spinner if loading
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is an authenticated user, return children
  if (isAuthenticated) return children;

  return null;
}

export default ProtectedRoute;
