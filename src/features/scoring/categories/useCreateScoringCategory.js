import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScoringCategory as createScoringCategoryApi } from "@/services/apiScoring";
import { scoringCategoriesKeys } from "../queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateScoringCategory() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createScoringCategory } = useMutation({
    mutationFn: createScoringCategoryApi,
    onSuccess: () => {
      toast.success("La catégorie a bien été créée");
      queryClient.invalidateQueries({
        queryKey: scoringCategoriesKeys.lists(),
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createScoringCategory };
}
