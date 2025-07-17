import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchErrorReports } from "@/services/apiErrorReports";

import { errorReportsKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "ean", value: null },
  { field: "comment", operator: "__contains", value: null },
  { field: "handled", value: null },
  { field: "contact", operator: "__contains", value: null },
];

export function useSearchErrorReports() {
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
    data: { data: errorReports, count } = {},
    error,
  } = useQuery({
    queryKey: errorReportsKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchErrorReports({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, errorReports, count };
}
