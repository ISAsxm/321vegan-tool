import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteInterestingProduct } from "@/services/apiInterestingProducts";
import { interestingProductsKeys } from "./queryKeyFactory";

export function useDeleteInterestingProduct() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteInterestingProductMutation } =
    useMutation({
      mutationFn: deleteInterestingProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: interestingProductsKeys.lists(),
        });
        toast.success("Produit d'intérêt supprimé avec succès");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return {
    isDeleting,
    deleteInterestingProduct: deleteInterestingProductMutation,
  };
}
