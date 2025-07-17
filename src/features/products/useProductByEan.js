import { useQuery } from "@tanstack/react-query";

import { getSearchProducts } from "@/services/apiProducts";
import { productsKeys } from "./queryKeyFactory";

export function useProductByEan(ean) {
  const {
    isPending,
    data: { data: products } = {},
    error,
  } = useQuery({
    queryKey: productsKeys.list(
      [{ field: "ean", value: ean }],
      "created_at-desc",
      1,
      1
    ),
    queryFn: () =>
      getSearchProducts({
        filters: [{ field: "ean", value: ean }],
        sortBy: "created_at-desc",
        page: 1,
        size: 1,
      }),
    enabled: !!ean,
    retry: false,
  });

  const product = products?.[0] || null;

  return { isPending, error, product };
}
