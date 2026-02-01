import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProductCategory as createProductCategoryApi,
  uploadProductCategoryImage,
} from "@/services/apiProductCategories";
import { productCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateProductCategory() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createProductCategory } = useMutation({
    mutationFn: async ({ parent_category_id, name, image }) => {
      let category = await createProductCategoryApi({
        parent_category_id: parent_category_id || null,
        name,
      });
      if (image) {
        category = await uploadProductCategoryImage(category.id, image);
      }
      return Promise.resolve(category);
    },
    onSuccess: () => {
      toast.success("La catégorie de produit a bien été créée");
      queryClient.invalidateQueries({
        queryKey: productCategoriesKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createProductCategory };
}
