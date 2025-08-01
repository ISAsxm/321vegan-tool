import { createContext, useContext, useCallback } from "react";
import { useCurrentUser as useCurrentUserQuery } from "@/features/authentication/useCurrentUser";

import FullPage from "@/ui/FullPage";
import Spinner from "@/ui/Spinner";

const CurrentUserContext = createContext();

function CurrentUserProvider({ children }) {
  const { isPending, user: currentUser, userRoles } = useCurrentUserQuery();

  // Check if current user is authenticated
  const isAuthenticated = useCallback(
    function isAuthenticated() {
      return !!currentUser;
    },
    [currentUser]
  );

  // Check if current user has role to access or perform action
  const hasAccess = useCallback(
    function hasAccess(role) {
      if (!currentUser || !currentUser.roles) return false;
      return currentUser.roles.includes(role);
    },
    [currentUser]
  );

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        userRoles,
        hasAccess,
        isAuthenticated,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

function useCurrentUserContext() {
  const context = useContext(CurrentUserContext);
  if (context === undefined)
    throw new Error(
      "CurrentUserContext was used outside of CurrentUserProvider"
    );
  return context;
}

export { CurrentUserProvider, useCurrentUserContext };
