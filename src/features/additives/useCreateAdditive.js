import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdditive as createAdditiveApi } from "@/services/apiAdditives";
import { additivesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateAdditive() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createAdditive } = useMutation({
    mutationFn: createAdditiveApi,
    onSuccess: () => {
      toast.success("L'additif a bien été créé");
      return queryClient.invalidateQueries({
        queryKey: additivesKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createAdditive };
}
