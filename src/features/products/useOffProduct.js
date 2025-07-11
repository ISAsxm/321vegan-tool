import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { productsKeys } from "./queryKeyFactory";
import { useProduct } from "./useProduct";

import { getProductData } from "@/services/apiOpenFoodFacts";

export function useOffProduct() {
  const { productId } = useParams();

  const { isLoading, product } = useProduct(productId);

  const productCode = product?.ean;

  const { isLoading: isLoadingOff, data: offProduct } = useQuery({
    queryKey: productsKeys.off(productId, productCode),
    queryFn: () => getProductData(productCode),
    // The query will not execute until the productCode exists
    enabled: !!productCode,
    retry: false,
    staleTime: Infinity,
    meta: {
      errorMessage: `Ean ${productCode} inconnu dans Open Food Facts`,
    },
  });

  return { isLoading, product, isLoadingOff, offProduct };
}
