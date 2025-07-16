import { useQuery } from "@tanstack/react-query";

import { getSearchProducts } from "@/services/apiProducts";
import { PRODUCT_STATES } from "@/utils/constants";

import { productsKeys } from "@/features/products/queryKeyFactory";

export function useAllTimeProductStateCounts() {
  const stateKeys = Object.keys(PRODUCT_STATES);

  const queries = stateKeys.map((state) => {
    return useQuery({
      queryKey: productsKeys.list(
        [{ field: "state", value: state }],
        "created_at-desc",
        1,
        1
      ),
      queryFn: () =>
        getSearchProducts({
          filters: [{ field: "state", value: state }],
          sortBy: "created_at-desc",
          page: 1,
          size: 1,
        }),
    });
  });

  const isPending = queries.some((query) => query.isPending);
  const error = queries.find((query) => query.error)?.error;

  const stateCounts = stateKeys.reduce((acc, state, index) => {
    acc[state] = queries[index].data?.count || 0;
    return acc;
  }, {});

  return { isPending, error, stateCounts };
}
