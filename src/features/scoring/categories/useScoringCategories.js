import { useQuery } from "@tanstack/react-query";
import { getScoringCategories } from "@/services/apiScoring";
import { scoringCategoriesKeys } from "./queryKeyFactory";

export function useScoringCategories() {
  const {
    isPending,
    data: { data: categories, count } = {},
    error,
  } = useQuery({
    queryKey: scoringCategoriesKeys.lists(),
    queryFn: getScoringCategories,
  });

  return { isPending, error, categories, count };
}
