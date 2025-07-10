import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "@/services/apiAuth";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      setToken();
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error(
        "Une erreur est survenue. Veuillez réessayer utlérieurement ou contacter le support si le problème persiste"
      );
    },
  });

  return { isLoading, logout };
}
