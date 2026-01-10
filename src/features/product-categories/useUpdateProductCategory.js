import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductCategory as updateProductCategoryApi } from "@/services/apiProductCategories";
import { productCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateProductCategory() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateProductCategory } = useMutation({
    mutationFn: ({ id, newData }) => updateProductCategoryApi(id, newData),
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
