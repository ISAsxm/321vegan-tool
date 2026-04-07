import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShopReview as deleteShopReviewApi } from "@/services/apiShopReviews";
import { shopReviewsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteShopReview() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteShopReview } = useMutation({
    mutationFn: deleteShopReviewApi,
    onSuccess: (data, id) => {
      toast.success("L'avis a bien été supprimé");
      queryClient.removeQueries(shopReviewsKeys.detail(id));
      queryClient.invalidateQueries({
        queryKey: shopReviewsKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteShopReview };
}
