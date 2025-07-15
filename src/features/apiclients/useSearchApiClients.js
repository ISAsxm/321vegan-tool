import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { apiclientsKeys } from "./queryKeyFactory";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchApiClients } from "@/services/apiApiClients";

const filterFields = [
  { field: "name", operator: "__contains", value: null },
  { field: "api_key", operator: "__contains", value: null },
  { field: "is_active", value: null },
];

export function useSearchApiClients() {
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
    data: { data: clients, count } = {},
    error,
    isPreviousData,
  } = useQuery({
    queryKey: apiclientsKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchApiClients({ filters, sortBy, page, size }),
    keepPreviousData: true,
  });

  // PRE-FETCHING
  useEffect(() => {
    const pageCount = Math.ceil(count / size);
    if (!isPreviousData && page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: apiclientsKeys.list(filters, sortBy, page + 1, size),
        queryFn: () =>
          getSearchApiClients({ filters, sortBy, page: page + 1, size }),
      });
    }
  }, [count, filters, sortBy, page, size, isPreviousData, queryClient]);

  return { isLoading, error, clients, count };
}
