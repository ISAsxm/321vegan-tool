import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchInterestingProducts } from "@/services/apiInterestingProducts";

import { interestingProductsKeys } from "./queryKeyFactory";

const filterFields = [
  { field: "ean", value: null },
  { field: "name", operator: "__contains", value: null },
  { field: "type", value: null },
  { field: "brand", operator: "___name__lookalike", value: null },
  { field: "category", operator: "___name__lookalike", value: null },
];

export function useSearchInterestingProducts() {
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
    data: { data: interestingProducts, count } = {},
    error,
  } = useQuery({
    queryKey: interestingProductsKeys.list(filters, sortBy, page, size),
    queryFn: () =>
      getSearchInterestingProducts({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, interestingProducts, count };
}
