import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createInterestingProduct } from "@/services/apiInterestingProducts";
import { interestingProductsKeys } from "./queryKeyFactory";

export function useCreateInterestingProduct() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createInterestingProductMutation } =
    useMutation({
      mutationFn: createInterestingProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: interestingProductsKeys.lists(),
        });
        toast.success("Produit d'intérêt créé avec succès");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return {
    isCreating,
    createInterestingProduct: createInterestingProductMutation,
  };
}
