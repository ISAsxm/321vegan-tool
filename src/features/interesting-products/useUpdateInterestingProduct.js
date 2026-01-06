import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateInterestingProduct } from "@/services/apiInterestingProducts";
import { interestingProductsKeys } from "./queryKeyFactory";

export function useUpdateInterestingProduct() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateInterestingProductMutation } =
    useMutation({
      mutationFn: updateInterestingProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: interestingProductsKeys.lists(),
        });
        toast.success("Produit d'intérêt modifié avec succès");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return {
    isUpdating,
    updateInterestingProduct: updateInterestingProductMutation,
  };
}
