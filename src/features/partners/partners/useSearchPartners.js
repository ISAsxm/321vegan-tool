import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchPartners } from "@/services/apiPartners";

import { partnersKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "name", operator: "__lookalike", value: null },
  { field: "category", operator: "___name__lookalike", value: null },
  { field: "is_active", value: null },
];

export function useSearchPartners() {
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
    data: { data: partners, count } = {},
    error,
  } = useQuery({
    queryKey: partnersKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchPartners({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, partners, count };
}
