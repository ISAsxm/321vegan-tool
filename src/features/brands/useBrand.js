import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { brandsKeys } from "./queryKeyFactory";

import { getBrand } from "@/services/apiBrands";
import { getBrandScores } from "@/services/apiScoring";

export function useBrand() {
  const { brandId } = useParams();

  const {
    isPending: isPendingBrand,
    data: brand,
    error,
  } = useQuery({
    queryKey: brandsKeys.detail(brandId),
    queryFn: () => getBrand(brandId),
    retry: false,
  });

  const { isPending: isPendingScores, data: scores } = useQuery({
    queryKey: brandsKeys.scores(brandId),
    queryFn: () => getBrandScores(brandId),
    // The query will not execute until the brand exists
    enabled: !!brand,
  });
  const isPending = isPendingBrand || isPendingScores;
  return { isPending, error, brand, scores };
}
