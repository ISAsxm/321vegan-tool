import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { productCategoriesKeys } from "./queryKeyFactory";

import { getProductCategory } from "@/services/apiProductCategories";

export function useProductCategory() {
  const { productCategoryId } = useParams();

  const {
    isPending,
    data: productCategory,
    error,
  } = useQuery({
    queryKey: productCategoriesKeys.detail(productCategoryId),
    queryFn: () => getProductCategory(productCategoryId),
    retry: false,
  });

  return { isPending, error, productCategory };
}
