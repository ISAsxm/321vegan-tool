import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiAuth";

import { USER_ROLES } from "@/utils/constants";

function transformUserRole(data) {
  const newData = { ...data, roles: USER_ROLES[data.role].roles };
  return newData;
}

export function useCurrentUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    select: transformUserRole,
    retry: 0,
  });
  return {
    isLoading,
    user,
    userRoles: user?.roles,
  };
}
