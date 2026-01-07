import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createInterestingProduct,
  uploadInterestingProductImage,
} from "@/services/apiInterestingProducts";
import { interestingProductsKeys } from "./queryKeyFactory";

export function useCreateInterestingProduct() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createInterestingProductMutation } =
    useMutation({
      mutationFn: async ({ ean, name, image, type, category_id, brand_id }) => {
        let product = await createInterestingProduct({
          ean,
          name,
          type,
          category_id: category_id || null,
          brand_id: brand_id || null,
        });
        if (image) {
          product = await uploadInterestingProductImage(product.id, image);
        }
        return Promise.resolve(product);
      },
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
