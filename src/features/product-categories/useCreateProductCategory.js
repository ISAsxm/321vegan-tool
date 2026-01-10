import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductCategory as createProductCategoryApi } from "@/services/apiProductCategories";
import { productCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateProductCategory() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createProductCategory } = useMutation({
    mutationFn: createProductCategoryApi,
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
