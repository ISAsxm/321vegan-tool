import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchScoringCriteria } from "@/services/apiScoring";

import { scoringCriteriaKeys } from "../queryKeyFactory";

const filterFields = [
  { field: "name", operator: "__lookalike", value: null },
  { field: "category", operator: "___name__lookalike", value: null },
];

export function useSearchScoringCriteria() {
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
    data: { data: scoringCriteria, count } = {},
    error,
  } = useQuery({
    queryKey: scoringCriteriaKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchScoringCriteria({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, scoringCriteria, count };
}
