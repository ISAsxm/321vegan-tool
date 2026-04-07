import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShopReviewStatus as updateShopReviewStatusApi } from "@/services/apiShopReviews";
import { shopReviewsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateShopReviewStatus() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingStatus, mutate: updateShopReviewStatus } =
    useMutation({
      mutationFn: ({ id, newStatus }) =>
        updateShopReviewStatusApi(id, newStatus),
      onSuccess: () => {
        toast.success("Le statut de l'avis a bien été modifié");
        queryClient.invalidateQueries({
          queryKey: shopReviewsKeys.all(),
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isUpdatingStatus, updateShopReviewStatus };
}
