import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset as requestPasswordResetApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useRequestPasswordReset() {
  const { mutate: requestPasswordReset, isPending } = useMutation({
    mutationFn: requestPasswordResetApi,
    onSuccess: () => {
      toast.success(
        "Un lien de réinitialisation a été envoyé à votre adresse e-mail"
      );
    },
    onError: (err) => {
      toast.error(err.message || "Une erreur est survenue");
    },
  });

  return { requestPasswordReset, isPending };
}
