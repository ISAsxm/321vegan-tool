import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { partnerCategoriesKeys } from "./queryKeyFactory";

import { getPartnerCategory } from "@/services/apiPartnerCategories";

export function usePartnerCategory() {
  const { partnerCategoryId } = useParams();

  const {
    isPending,
    data: partnerCategory,
    error,
  } = useQuery({
    queryKey: partnerCategoriesKeys.detail(partnerCategoryId),
    queryFn: () => getPartnerCategory(partnerCategoryId),
    retry: false,
  });

  return { isPending, error, partnerCategory };
}
