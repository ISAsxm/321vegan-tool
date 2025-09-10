import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScoringCategory as updateScoringCategoryApi } from "@/services/apiScoring";
import {
  createScoringCriterion as createScoringCriterionApi,
  updateScoringCriterion as updateScoringCriterionApi,
  deleteScoringCriterion as deleteScoringCriterionApi,
} from "@/services/apiScoring";
import { scoringCategoriesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateScoringCategory() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateScoringCategory } = useMutation({
    mutationFn: async ({ id, newData }) => {
      const criteria = newData.criteria;
      const category = await updateScoringCategoryApi(id, newData);
      return Promise.all(
        criteria.map((criterion) => {
          if (criterion.id) {
            if (criterion.category_id) {
              updateScoringCriterionApi(criterion.id, criterion);
            } else {
              deleteScoringCriterionApi(criterion.id);
            }
          } else {
            createScoringCriterionApi({
              category_id: category.id,
              name: criterion.name,
            });
          }
        })
      );
    },
    onSuccess: () => {
      toast.success("La catégorie a bien été modifiée");
      queryClient.invalidateQueries({
        queryKey: scoringCategoriesKeys.lists(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateScoringCategory };
}
