import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScoringCategory as updateScoringCategoryApi } from "@/services/apiScoring";
import { scoringCategoriesKeys } from "../queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateScoringCategory() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateScoringCategory } = useMutation({
    mutationFn: ({ id, newData }) => updateScoringCategoryApi(id, newData),
    onSuccess: () => {
      toast.success("La catégorie a bien été modifiée");
      queryClient.invalidateQueries({
        queryKey: scoringCategoriesKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateScoringCategory };
}
