import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchBrands } from "@/services/apiBrands";

import { brandsKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "name", operator: "contains__", value: null },
  { field: "parent", operator: "name___contains__", value: null },
];

export function useSearchBrands() {
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
    data: { data: brands, count } = {},
    error,
    isPreviousData,
  } = useQuery({
    queryKey: brandsKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchBrands({ filters, sortBy, page, size }),
    keepPreviousData: true,
  });

  // PRE-FETCHING
  useEffect(() => {
    const pageCount = Math.ceil(count / size);
    if (!isPreviousData && page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: brandsKeys.list(filters, sortBy, page + 1, size),
        queryFn: () =>
          getSearchBrands({ filters, sortBy, page: page + 1, size }),
      });
    }
  }, [count, filters, sortBy, page, size, isPreviousData, queryClient]);

  return { isLoading, error, brands, count };
}
