import { useQuery } from "@tanstack/react-query";

import { countShopReviews } from "@/services/apiShopReviews";

import { shopReviewsKeys } from "@/features/shop-reviews/queryKeyFactory";

export function useShopReviewsCount(value, operator = "") {
  const filters = [{ field: `status${operator}`, value: value }];
  const {
    isPending,
    data: count = 0,
    error,
  } = useQuery({
    queryKey: shopReviewsKeys.count(filters),
    queryFn: () => countShopReviews(filters),
  });

  return { isPending, error, count };
}
