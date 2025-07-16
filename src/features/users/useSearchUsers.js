import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { usersKeys } from "./queryKeyFactory";

import { PAGE_SIZE } from "@/utils/constants";
import { buildQueryFilters } from "@/utils/helpers";
import { getSearchUsers } from "@/services/apiUsers";

const filterFields = [
  { field: "nickname", operator: "__contains", value: null },
  { field: "status", value: null },
  { field: "role", value: null },
  { field: "is_active", value: null },
];

export function useSearchUsers() {
  const [searchParams] = useSearchParams();

  // FILTERS
  const filters = buildQueryFilters(filterFields, searchParams);

  // SORT
  const sortBy = searchParams.get("sortBy") || "created_at-desc";

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const size = !searchParams.get("size")
    ? PAGE_SIZE
    : Number(searchParams.get("size"));

  const {
    isPending,
    data: { data: users, count } = {},
    error,
  } = useQuery({
    queryKey: usersKeys.list(filters, sortBy, page, size),
    queryFn: () => getSearchUsers({ filters, sortBy, page, size }),
    placeholderData: keepPreviousData,
  });

  return { isPending, error, users, count };
}
