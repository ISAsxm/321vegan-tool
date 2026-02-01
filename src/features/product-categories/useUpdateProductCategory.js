import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProductCategory as updateProductCategoryApi,
  uploadProductCategoryImage,
  deleteProductCategoryImage,
} from "@/services/apiProductCategories";
import { productCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateProductCategory() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateProductCategory } = useMutation({
    mutationFn: async ({ id, newData }) => {
      const { parent_category_id, name, image } = newData;
      if (typeof image === "string" || image instanceof String) {
        return await updateProductCategoryApi(id, {
          parent_category_id: parent_category_id || null,
          name,
        });
      } else {
        return Promise.all([
          updateProductCategoryApi(id, {
            parent_category_id: parent_category_id || null,
            name,
          }),
          image
            ? uploadProductCategoryImage(id, image)
            : deleteProductCategoryImage(id),
        ]);
      }
    },
    onSuccess: () => {
      toast.success("La catégorie de produit a bien été modifiée");
      queryClient.invalidateQueries({
        queryKey: productCategoriesKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateProductCategory };
}
