import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePartnerCategory as deletePartnerCategoryApi } from "@/services/apiPartnerCategories";
import { partnerCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeletePartnerCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deletePartnerCategory } = useMutation({
    mutationFn: deletePartnerCategoryApi,
    onSuccess: (data, id) => {
      toast.success("La catégorie de partenaire a bien été supprimée");
      queryClient.removeQueries(partnerCategoriesKeys.detail(id));
      queryClient.invalidateQueries({
        queryKey: partnerCategoriesKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePartnerCategory };
}
