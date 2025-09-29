import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchBrands } from "@/services/apiBrands";

import { brandsKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "name", operator: "__lookalike", value: null },
  { field: "parent", operator: "___name__lookalike", value: null },
  { field: "boycott", value: null },
];

export function useSearchBrands() {
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
    data: { data: brands, count } = {},
    error,
  } = useQuery({
    queryKey: brandsKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchBrands({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, brands, count };
}
