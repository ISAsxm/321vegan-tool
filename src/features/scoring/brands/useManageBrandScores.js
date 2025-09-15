import { useMutation, useQueryClient } from "@tanstack/react-query";
import { brandsKeys } from "@/features/brands/queryKeyFactory";
import {
  createUpdateBrandScore,
  deleteBrandScore,
} from "@/services/apiScoring";
import toast from "react-hot-toast";

export function useManageBrandScores() {
  const queryClient = useQueryClient();

  const { isPending: isManaging, mutate: manageBrandScores } = useMutation({
    mutationFn: async ({ id, data }) => {
      return Promise.all(
        data.map((result) => {
          if (parseInt(result.score) < 0) {
            deleteBrandScore(id, result.criterion_id);
          } else {
            createUpdateBrandScore(id, result);
          }
        })
      );
    },
    onSuccess: () => {
      toast.success("Le score a bien été sauvegardé");
      return queryClient.invalidateQueries({
        queryKey: brandsKeys.all(),
        refetchType: "all",
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isManaging, manageBrandScores };
}
