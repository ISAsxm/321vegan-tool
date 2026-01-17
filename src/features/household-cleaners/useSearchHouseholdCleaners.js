import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchHouseholdCleaners } from "@/services/apiHouseholdCleaners";

import { householdCleanersKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "brand_name", operator: "__contains", value: null },
  { field: "is_vegan", value: null },
  { field: "is_cruelty_free", value: null },
];

export function useSearchHouseholdCleaners() {
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
    data: { data: householdCleaners, count } = {},
    error,
  } = useQuery({
    queryKey: householdCleanersKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchHouseholdCleaners({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, householdCleaners, count };
}
