import { useQuery } from "@tanstack/react-query";

import { getSearchProducts } from "@/services/apiProducts";
import { PRODUCT_STATUSES } from "@/utils/constants";

import { productsKeys } from "@/features/products/queryKeyFactory";

export function useAllProductStatusCounts() {
  const statusKeys = Object.keys(PRODUCT_STATUSES);

  const queries = statusKeys.map((status) => {
    return useQuery({
      queryKey: productsKeys.list(
        [{ field: "status", value: status }],
        "created_at-desc",
        1,
        1
      ),
      queryFn: () =>
        getSearchProducts({
          filters: [{ field: "status", value: status }],
          sortBy: "created_at-desc",
          page: 1,
          size: 1,
        }),
    });
  });

  const isPending = queries.some((query) => query.isPending);
  const error = queries.find((query) => query.error)?.error;

  const statusCounts = statusKeys.reduce((acc, status, index) => {
    acc[status] = queries[index].data?.count || 0;
    return acc;
  }, {});

  return { isPending, error, statusCounts };
}
