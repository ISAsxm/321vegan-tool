import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPartnerCategory as createPartnerCategoryApi } from "@/services/apiPartnerCategories";
import { partnerCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreatePartnerCategory() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createPartnerCategory } = useMutation({
    mutationFn: createPartnerCategoryApi,
    onSuccess: () => {
      toast.success("La catégorie de partenaire a bien été créée");
      queryClient.invalidateQueries({
        queryKey: partnerCategoriesKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createPartnerCategory };
}
