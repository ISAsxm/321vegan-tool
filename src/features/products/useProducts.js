import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/apiProducts";
import { productsKeys } from "./queryKeyFactory";

export function useProducts() {
  const {
    isPending,
    data: { data: products, count } = {},
    error,
  } = useQuery({
    queryKey: productsKeys.lists(),
    queryFn: getProducts,
  });

  return { isPending, error, products, count };
}
