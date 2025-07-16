import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

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
    data: { data: clients, count } = {},
    error,
  } = useQuery({
    queryKey: apiclientsKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchApiClients({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, clients, count };
}
