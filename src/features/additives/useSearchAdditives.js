import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchAdditives } from "@/services/apiAdditives";

import { additivesKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "e_number", operator: "contains__", value: null },
  { field: "name", operator: "contains__", value: null },
  { field: "status", operator: "", value: null },
];

export function useSearchAdditives() {
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
    data: { data: additives, count } = {},
    error,
    isPreviousData,
  } = useQuery({
    queryKey: additivesKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchAdditives({ filters, sortBy, page, size }),
    keepPreviousData: true,
  });

  // PRE-FETCHING
  useEffect(() => {
    const pageCount = Math.ceil(count / size);
    if (!isPreviousData && page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: additivesKeys.list(filters, sortBy, page + 1, size),
        queryFn: () =>
          getSearchAdditives({ filters, sortBy, page: page + 1, size }),
      });
    }
  }, [count, filters, sortBy, page, size, isPreviousData, queryClient]);

  return { isLoading, error, additives, count };
}
