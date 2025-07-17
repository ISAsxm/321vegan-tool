import { useQuery } from "@tanstack/react-query";

import { countProducts } from "@/services/apiProducts";

import { productsKeys } from "./queryKeyFactory";

export function useCountProducts(filters = []) {
  const {
    isPending,
    data: count,
    error,
  } = useQuery({
    queryKey: productsKeys.count(filters),
    queryFn: async () => await countProducts(filters),
  });
  return { isPending, error, count };
}
