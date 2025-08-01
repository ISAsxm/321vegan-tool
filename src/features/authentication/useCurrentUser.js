import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiAuth";

export function useCurrentUser() {
  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: 0,
  });
  return {
    isPending,
    user,
    userRoles: user?.roles,
    error,
  };
}
