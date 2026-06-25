import { useMutation, useQuery } from "@tanstack/react-query";
import {
  requestEmailChange as requestEmailChangeApi,
  confirmEmailChange as confirmEmailChangeApi,
} from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useRequestEmailChange() {
  const { mutate: requestEmailChange, isPending } = useMutation({
    mutationFn: requestEmailChangeApi,
    onSuccess: () => {
      toast.success(
        "Un lien de confirmation a été envoyé à votre nouvelle adresse e-mail",
      );
    },
    onError: (err) => {
      toast.error(err.message || "Une erreur est survenue");
    },
  });

  return { requestEmailChange, isPending };
}

export function useConfirmEmailChange(token) {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["confirmEmailChange", token],
    queryFn: () => confirmEmailChangeApi(token),
    enabled: !!token,
    retry: false,
  });

  return { data, isLoading, error, isSuccess };
}
