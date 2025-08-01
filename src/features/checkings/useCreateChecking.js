import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChecking as createCheckingApi } from "@/services/apiCheckings";
import { productsKeys } from "@/features/products/queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateChecking() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createChecking } = useMutation({
    mutationFn: createCheckingApi,
    onSuccess: () => {
      toast.success("La prise de contact a bien été créée");
      queryClient.invalidateQueries({
        queryKey: productsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createChecking };
}
