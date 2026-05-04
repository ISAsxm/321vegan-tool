import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "@/services/apiUsers";

export function useLeaderboard(sortby) {
  const { isPending, data: users = [], error } = useQuery({
    queryKey: ["leaderboard", sortby],
    queryFn: () => getLeaderboard(sortby),
  });

  return { isPending, users, error };
}
