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
      const { image } = newData;
      const newProductData = {
        ...newData,
        brand_id: newData?.brand_id || newData?.brand?.id || null,
      };
      if (typeof image === "string" || image instanceof String) {
        return await updateProductApi(id, newProductData);
      } else {
        return Promise.all([
          updateProductApi(id, newProductData),
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
