import { useQuery } from "@tanstack/react-query";

import { countErrorReports } from "@/services/apiErrorReports";

import { errorReportsKeys } from "./queryKeyFactory";

export function useUntreatedErrorReportsCount() {
  // Filter for untreated error reports (handled = false)
  const filters = [{ field: "handled", value: false }];

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
