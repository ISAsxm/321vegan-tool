import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScoringCriterion as updateScoringCriterionApi } from "@/services/apiScoring";
import { scoringCategoriesKeys } from "@/features/scoring/categories/queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateScoringCriterion() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateScoringCriterion } = useMutation(
    {
      mutationFn: ({ id, newData }) => updateScoringCriterionApi(id, newData),
      onSuccess: () => {
        toast.success("Le critère a bien été modifié");
        queryClient.invalidateQueries({
          queryKey: scoringCategoriesKeys.all(),
        });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isUpdating, updateScoringCriterion };
}
