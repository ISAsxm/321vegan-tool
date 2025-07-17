import { useQuery } from "@tanstack/react-query";

import { buildQueryFilters } from "@/utils/helpers";
import { countErrorReports } from "@/services/apiErrorReports";

import { errorReportsKeys } from "./queryKeyFactory";

export function useUntreatedErrorReportsCount() {
  const filterFields = [{ field: "handled", value: false }];
  const filters = buildQueryFilters(filterFields, new URLSearchParams());

  const {
    isPending,
    data: count = 0,
    error,
  } = useQuery({
    queryKey: errorReportsKeys.count(filters),
    queryFn: () => countErrorReports(filters),
  });

  return { isPending, error, untreatedCount: count };
}
