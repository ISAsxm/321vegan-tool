import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchShopReviews } from "@/services/apiShopReviews";

import { shopReviewsKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "shop", operator: "___name__contains", value: null },
  { field: "user", operator: "___nickname__contains", value: null },
  { field: "comment", operator: "__contains", value: null },
  { field: "status", value: null },
  { field: "rating", value: null },
];

export function useSearchShopReviews() {
  const [searchParams] = useSearchParams();

  // FILTERS
  const filters = buildQueryFilters(filterFields, searchParams);

  // SORT
  const sortBy = searchParams.get("sortBy") || "created_at-desc";

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const size = !searchParams.get("size")
    ? PAGE_SIZE
    : Number(searchParams.get("size"));

  const {
    isPending,
    data: { data: shopReviews, count } = {},
    error,
  } = useQuery({
    queryKey: shopReviewsKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchShopReviews({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, shopReviews, count };
}
