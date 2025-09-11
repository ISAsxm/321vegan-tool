import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApiClient as deleteApiClientApi } from "@/services/apiApiClients";
import { apiclientsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteApiClient() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteApiClient } = useMutation({
    mutationFn: deleteApiClientApi,
    onSuccess: () => {
      toast.success("Le client API a bien été supprimé");
      queryClient.invalidateQueries({
        queryKey: apiclientsKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteApiClient };
}
