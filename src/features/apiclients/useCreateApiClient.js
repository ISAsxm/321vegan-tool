import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApiClient as createApiClientApi } from "@/services/apiApiClients";
import { apiclientsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateApiClient() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createApiClient } = useMutation({
    mutationFn: createApiClientApi,
    onSuccess: () => {
      toast.success("Le client API a bien été créé");
      queryClient.invalidateQueries({
        queryKey: apiclientsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createApiClient };
}
