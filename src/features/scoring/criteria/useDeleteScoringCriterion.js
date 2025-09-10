import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScoringCriterion as deleteScoringCriterionApi } from "@/services/apiScoring";
import { scoringCriteriaKeys } from "../queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteScoringCriterion() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteScoringCriterion } = useMutation(
    {
      mutationFn: deleteScoringCriterionApi,
      onSuccess: () => {
        toast.success("Le critère a bien été supprimé");
        queryClient.invalidateQueries({
          queryKey: scoringCriteriaKeys.all,
        });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isDeleting, deleteScoringCriterion };
}
