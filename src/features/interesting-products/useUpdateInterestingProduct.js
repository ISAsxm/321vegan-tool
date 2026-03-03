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
  const { isPending: isUpdating, mutate: updateInterestingProduct } =
    useMutation({
      mutationFn: async ({ id, newData }) => {
        const { ean, name, image, type, category_id, brand_id } = newData;
        if (typeof image === "string" || image instanceof String) {
          return await updateInterestingProductApi(id, {
            ean,
            name,
            type,
            category_id: category_id || null,
            brand_id: brand_id || null,
          });
        } else {
          return Promise.all([
            updateInterestingProductApi(id, {
              ean,
              name,
              type,
              category_id: category_id || null,
              brand_id: brand_id || null,
            }),
            image
              ? uploadInterestingProductImage(id, image)
              : deleteInterestingProductImage(id),
          ]);
        }
      },
      onSuccess: () => {
        toast.success("Le produit d'intérêt a bien été modifié");
        return queryClient.invalidateQueries({
          queryKey: interestingProductsKeys.all(),
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isUpdating, updateInterestingProduct };
}
