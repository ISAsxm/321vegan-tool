import { useQuery } from "@tanstack/react-query";

import { partnerCategoriesKeys } from "./queryKeyFactory";

import { getPartnerCategoriesForSelect } from "@/services/apiPartnerCategories";

export function useSelectPartnerCategory() {
  const {
    isPending,
    data: { data: partnerCategories } = {},
    error,
  } = useQuery({
    queryKey: partnerCategoriesKeys.select(),
    queryFn: () => getPartnerCategoriesForSelect(),
    retry: false,
  });

  return { isPending, error, partnerCategories };
}
