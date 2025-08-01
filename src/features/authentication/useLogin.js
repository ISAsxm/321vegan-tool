import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      setToken(data.access_token);
      queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "all",
      });
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("E-mail ou mot de passe incorrect");
    },
  });

  return { isPending, login };
}
