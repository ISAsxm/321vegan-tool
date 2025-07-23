import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApiClient as updateApiClientApi } from "@/services/apiApiClients";
import { apiclientsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateApiClient() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateApiClient } = useMutation({
    mutationFn: ({ id, newData }) => updateApiClientApi(id, newData),
    onSuccess: () => {
      toast.success("L'utilisateurice a bien été modifié.e");
      queryClient.invalidateQueries({
        queryKey: apiclientsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateApiClient };
}
