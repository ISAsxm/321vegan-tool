import { setHeaderToken, removeHeaderToken } from "@/services/axiosInstance";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      setHeaderToken(token);
    } else {
      removeHeaderToken();
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
