import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast, { Toaster } from "react-hot-toast";

import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CurrentUserProvider } from "@/contexts/CurrentUserContext";

import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Product from "@/pages/Product";
import Register from "@/pages/Register";
import Checkings from "@/pages/Checkings";
import Additives from "@/pages/Additives";
import Additive from "@/pages/Additive";
import Cosmetics from "@/pages/Cosmetics";
import Brands from "@/pages/Brands";
import Users from "@/pages/Users";
import ApiClients from "@/pages/ApiClients";
import ErrorReports from "@/pages/ErrorReports";
import Account from "@/pages/Account";
import Login from "@/pages/Login";
import PageNotFound from "@/pages/PageNotFound";

import ProtectedRoute from "@/ui/ProtectedRoute";
import ProtectedRouteRole from "@/ui/ProtectedRouteRole";
import AppLayout from "@/ui/AppLayout";

import GlobalStyles from "@/styles/GlobalStyles";

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            retry: (failureCount, error) => {
              if (error.response?.status === 401) {
                return false; // do not retry, trigger error
              }
              // otherwise, restore default
              const defaultRetry = new QueryClient().getDefaultOptions().queries
                ?.retry;
              return Number.isSafeInteger(defaultRetry)
                ? failureCount < (defaultRetry ?? 0)
                : false;
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (error.response?.status !== 401) {
              toast.error(
                query?.meta?.errorMessage ||
                  `Une erreur est survenue. Veuillez réessayer utlérieurement ou contacter le support si le problème persiste`
              );
            }
          },
        }),
      })
  );

  return (
    <AuthProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <CurrentUserProvider>
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  </CurrentUserProvider>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:productId" element={<Product />} />
                <Route
                  path="register/:productEan"
                  element={
                    <ProtectedRouteRole role="contributor">
                      <Register />
                    </ProtectedRouteRole>
                  }
                />
                <Route
                  path="checkings"
                  element={
                    <ProtectedRouteRole role="contributor">
                      <Checkings />
                    </ProtectedRouteRole>
                  }
                />
                <Route path="additives" element={<Additives />} />
                <Route path="additives/:additiveId" element={<Additive />} />
                <Route path="cosmetics" element={<Cosmetics />} />
                <Route path="brands" element={<Brands />} />
                <Route
                  path="error-reports"
                  element={
                    <ProtectedRouteRole role="contributor">
                      <ErrorReports />
                    </ProtectedRouteRole>
                  }
                />
                <Route
                  path="users"
                  element={
                    <ProtectedRouteRole role="admin">
                      <Users />
                    </ProtectedRouteRole>
                  }
                />
                <Route
                  path="clients"
                  element={
                    <ProtectedRouteRole role="admin">
                      <ApiClients />
                    </ProtectedRouteRole>
                  }
                />
                <Route path="account" element={<Account />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
