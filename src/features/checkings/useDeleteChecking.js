import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChecking as deleteCheckingApi } from "@/services/apiCheckings";
import { productsKeys } from "@/features/products/queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteChecking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteChecking } = useMutation({
    mutationFn: deleteCheckingApi,
    onSuccess: () => {
      toast.success("La prise de contact a bien été supprimée");
      queryClient.invalidateQueries({
        queryKey: productsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteChecking };
}
