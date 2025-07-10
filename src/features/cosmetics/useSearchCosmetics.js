import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchCosmetics } from "@/services/apiCosmetics";

import { cosmeticsKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "name", operator: "contains__", value: null },
  { field: "is_vegan", value: null },
  { field: "is_cf", value: null },
];

export function useSearchCosmetics() {
  const queryClient = useQueryClient();
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
    isLoading,
    data: { data: cosmetics, count } = {},
    error,
    isPreviousData,
  } = useQuery({
    queryKey: cosmeticsKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchCosmetics({ filters, sortBy, page, size }),
    keepPreviousData: true,
  });

  // PRE-FETCHING
  useEffect(() => {
    const pageCount = Math.ceil(count / size);
    if (!isPreviousData && page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: cosmeticsKeys.list(filters, sortBy, page + 1, size),
        queryFn: () =>
          getSearchCosmetics({ filters, sortBy, page: page + 1, size }),
      });
    }
  }, [count, filters, sortBy, page, size, isPreviousData, queryClient]);

  return { isLoading, error, cosmetics, count };
}
