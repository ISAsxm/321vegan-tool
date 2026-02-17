import { useQuery } from "@tanstack/react-query";

import { countErrorReports } from "@/services/apiErrorReports";

import { errorReportsKeys } from "@/features/error-reports/queryKeyFactory";

export function useErrorReportsCount(handled = false) {
  const filters = [{ field: "handled", value: handled }];

  const {
    isPending,
    data: count = 0,
    error,
  } = useQuery({
    queryKey: errorReportsKeys.count(filters),
    queryFn: () => countErrorReports(filters),
  });

  return { isPending, error, count };
}
