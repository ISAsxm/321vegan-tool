import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScoringCategory as deleteScoringCategoryApi } from "@/services/apiScoring";
import { scoringCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteScoringCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteScoringCategory } = useMutation({
    mutationFn: deleteScoringCategoryApi,
    onSuccess: () => {
      toast.success("La catégorie a bien été supprimée");
      queryClient.invalidateQueries({
        queryKey: scoringCategoriesKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteScoringCategory };
}
