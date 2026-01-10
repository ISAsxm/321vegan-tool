import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductCategory as deleteProductCategoryApi } from "@/services/apiProductCategories";
import { productCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteProductCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteProductCategory } = useMutation({
    mutationFn: deleteProductCategoryApi,
    onSuccess: (data, id) => {
      toast.success("La catégorie de produit a bien été supprimée");
      queryClient.removeQueries(productCategoriesKeys.detail(id));
      queryClient.invalidateQueries({
        queryKey: productCategoriesKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProductCategory };
}
