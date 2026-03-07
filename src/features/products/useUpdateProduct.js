import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProduct as updateProductApi,
  uploadProductImage,
  deleteProductImage,
} from "@/services/apiProducts";
import { productsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateProduct } = useMutation({
    mutationFn: async ({ id, newData }) => {
      const {
        state,
        status,
        brand_id,
        ean,
        name,
        description,
        problem_description,
        biodynamic,
        has_non_vegan_old_receipe,
        image,
      } = newData;
      if (typeof image === "string" || image instanceof String) {
        return await updateProductApi(id, {
          state,
          status,
          ean,
          name,
          description,
          problem_description,
          biodynamic,
          has_non_vegan_old_receipe,
          brand_id: brand_id || null,
        });
      } else {
        return Promise.all([
          updateProductApi(id, {
            state,
            status,
            ean,
            name,
            description,
            problem_description,
            biodynamic,
            has_non_vegan_old_receipe,
            brand_id: brand_id || null,
          }),
          image ? uploadProductImage(id, image) : deleteProductImage(id),
        ]);
      }
    },
    onSuccess: () => {
      toast.success("Le produit a bien été modifié");
      return queryClient.invalidateQueries({
        queryKey: productsKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateProduct };
}
