import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchProducts } from "@/services/apiProducts";

import { productsKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "ean", operator: "__contains", value: null },
  { field: "name", operator: "__contains", value: null },
  { field: "status", value: null },
  { field: "state", value: null },
  { field: "brand", operator: "___name__contains", value: null },
];

export function useSearchProducts() {
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
    data: { data: products, count } = {},
    error,
    isPreviousData,
  } = useQuery({
    queryKey: productsKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchProducts({ filters, sortBy, page, size }),
    keepPreviousData: true,
  });

  // PRE-FETCHING
  useEffect(() => {
    const pageCount = Math.ceil(count / size);
    if (!isPreviousData && page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: productsKeys.list(filters, sortBy, page + 1, size),
        queryFn: () =>
          getSearchProducts({ filters, sortBy, page: page + 1, size }),
      });
    }
  }, [count, filters, sortBy, page, size, isPreviousData, queryClient]);

  return { isLoading, error, products, count };
}
