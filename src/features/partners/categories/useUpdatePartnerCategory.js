import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePartnerCategory as updatePartnerCategoryApi } from "@/services/apiPartnerCategories";
import { partnerCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdatePartnerCategory() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updatePartnerCategory } = useMutation({
    mutationFn: ({ id, newData }) => updatePartnerCategoryApi(id, newData),
    onSuccess: () => {
      toast.success("La catégorie de partenaire a bien été modifiée");
      queryClient.invalidateQueries({
        queryKey: partnerCategoriesKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updatePartnerCategory };
}
