import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScoringCriterion as createScoringCriterionApi } from "@/services/apiScoring";
import { scoringCategoriesKeys } from "@/features/scoring/categories/queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateScoringCriterion() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createScoringCriterion } = useMutation(
    {
      mutationFn: createScoringCriterionApi,
      onSuccess: () => {
        toast.success("Le critère a bien été créé");
        queryClient.invalidateQueries({
          queryKey: scoringCategoriesKeys.all(),
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  return { isCreating, createScoringCriterion };
}
