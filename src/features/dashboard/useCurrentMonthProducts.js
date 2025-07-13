import { useQuery } from "@tanstack/react-query";

import { beforeToday } from "@/utils/helpers";
import { getSearchProducts } from "@/services/apiProducts";

import { productsKeys } from "@/features/products/queryKeyFactory";

export function useCurrentMonthProducts() {
  // FILTERS
  const filters = [{ field: "created_at__ge", value: `${beforeToday(29)}` }];
  // SORT
  const sortBy = "created_at-asc";

  // PAGINATION
  const page = 1;
  const size = 100;

  const {
    isLoading,
    data: { data: products, count } = {},
    error,
  } = useQuery({
    queryKey: productsKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchProducts({ filters, sortBy, page, size }),
  });

  return { isLoading, error, products, count };
}
