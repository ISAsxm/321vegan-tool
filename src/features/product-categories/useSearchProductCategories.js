import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchProductCategories } from "@/services/apiProductCategories";

import { productCategoriesKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "name", operator: "__lookalike", value: null },
  { field: "parent", operator: "___name__lookalike", value: null },
];

export function useSearchProductCategories() {
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
    data: { data: productCategories, count } = {},
    error,
  } = useQuery({
    queryKey: productCategoriesKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchProductCategories({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, productCategories, count };
}
