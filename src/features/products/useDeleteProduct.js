import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "@/services/apiProducts";
import { productsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      toast.success("Le produit a bien été supprimé");
      return queryClient.invalidateQueries({
        queryKey: productsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProduct };
}
