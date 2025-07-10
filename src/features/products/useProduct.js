import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { productsKeys } from "./queryKeyFactory";

import { getProduct } from "@/services/apiProducts";

export function useProduct() {
  const { productId } = useParams();

  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: productsKeys.detail(productId),
    queryFn: () => getProduct(productId),
    retry: false,
  });

  return { isLoading, error, product };
}
