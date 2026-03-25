import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createInterestingProduct as createInterestingProductApi,
  uploadInterestingProductImage,
} from "@/services/apiInterestingProducts";
import { interestingProductsKeys } from "./queryKeyFactory";

export function useCreateInterestingProduct() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createInterestingProduct } =
    useMutation({
      mutationFn: async ({
        ean,
        alternative_products,
        name,
        image,
        type,
        category_id,
        brand_id,
      }) => {
        let product = await createInterestingProductApi({
          ean,
          name,
          type,
          alternative_products: alternative_products || [],
          category_id: category_id || null,
          brand_id: brand_id || null,
        });
        if (image) {
          product = await uploadInterestingProductImage(product.id, image);
        }
        return Promise.resolve(product);
      },
      onSuccess: () => {
        toast.success("Le produit d'intérêt a bien été créé");
        queryClient.invalidateQueries({
          queryKey: interestingProductsKeys.all(),
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isCreating, createInterestingProduct };
}
