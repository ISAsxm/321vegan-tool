import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchAdditives } from "@/services/apiAdditives";

import { additivesKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "e_number", operator: "__contains__", value: null },
  { field: "name", operator: "___name__lookalike", value: null },
  { field: "status", operator: "", value: null },
];

export function useSearchAdditives() {
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
    data: { data: additives, count } = {},
    error,
  } = useQuery({
    queryKey: additivesKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchAdditives({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, additives, count };
}
