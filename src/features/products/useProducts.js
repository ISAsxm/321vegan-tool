import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/apiProducts";
import { productsKeys } from "./queryKeyFactory";

export function useProducts() {
  const {
    isLoading,
    data: { data: products, count } = {},
    error,
  } = useQuery({
    queryKey: productsKeys.lists(),
    queryFn: getProducts,
  });

  return { isLoading, error, products, count };
}
