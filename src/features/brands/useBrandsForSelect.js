import { useQuery } from "@tanstack/react-query";

import { getBrands } from "@/services/apiBrands";

import { brandsKeys } from "./queryKeyFactory";

function transformBrandsForSelect(data) {
  const { data: brands, count } = data;
  const newData = brands.map((item) => ({ value: item.id, label: item.name }));
  return { data: newData, count };
}

export function useBrandsForSelect() {
  const {
    isPending,
    data: { data: brands, count } = {},
    error,
  } = useQuery({
    queryKey: brandsKeys.select(),
    queryFn: getBrands,
    select: transformBrandsForSelect,
  });
  return { isPending, error, brands, count };
}
