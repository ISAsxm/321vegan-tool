import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCosmetic as createCosmeticApi } from "@/services/apiCosmetics";
import { cosmeticsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateCosmetic() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCosmetic } = useMutation({
    mutationFn: createCosmeticApi,
    onSuccess: () => {
      toast.success("La marque de cosmétiques a bien été créée");
      return queryClient.invalidateQueries({
        queryKey: cosmeticsKeys.lists(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCosmetic };
}
