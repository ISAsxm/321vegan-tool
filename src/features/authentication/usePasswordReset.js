import { useMutation, useQuery } from "@tanstack/react-query";
import {
  verifyPasswordResetToken as verifyPasswordResetTokenApi,
  confirmPasswordReset as confirmPasswordResetApi,
} from "@/services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useVerifyPasswordResetToken(token, enabled = true) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["verifyPasswordResetToken", token],
    queryFn: () => verifyPasswordResetTokenApi(token),
    enabled: !!token && enabled,
    retry: false,
  });

  return { data, isLoading, error, isValidToken: !error && !!data };
}

export function useConfirmPasswordReset() {
  const navigate = useNavigate();

  const { mutate: confirmPasswordReset, isPending } = useMutation({
    mutationFn: confirmPasswordResetApi,
    onSuccess: () => {
      toast.success("Votre mot de passe a été réinitialisé avec succès");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message || "Une erreur est survenue");
    },
  });

  return { confirmPasswordReset, isPending };
}
