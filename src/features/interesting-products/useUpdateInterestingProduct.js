import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  updateInterestingProduct as updateInterestingProductApi,
  uploadInterestingProductImage,
  deleteInterestingProductImage,
} from "@/services/apiInterestingProducts";
import { interestingProductsKeys } from "./queryKeyFactory";

export function useUpdateInterestingProduct() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateInterestingProductMutation } =
    useMutation({
      mutationFn: async ({ id, newData }) => {
        const { ean, name, image, type, category_id, brand_id } = newData;
        if (typeof image === "string" || image instanceof String) {
          return await updateInterestingProductApi({
            id,
            newData: {
              ean,
              name,
              type,
              category_id: category_id || null,
              brand_id: brand_id || null,
            },
          });
        } else {
          return Promise.all([
            updateInterestingProductApi({
              id,
              newData: {
                ean,
                name,
                type,
                category_id: category_id || null,
                brand_id: brand_id || null,
              },
            }),
            image
              ? uploadInterestingProductImage(id, image)
              : deleteInterestingProductImage(id),
          ]);
        }
      },
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
