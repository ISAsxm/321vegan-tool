import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCosmetic as updateCosmeticApi } from "@/services/apiCosmetics";
import { cosmeticsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateCosmetic() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCosmetic } = useMutation({
    mutationFn: ({ id, newData }) => updateCosmeticApi(id, newData),
    onSuccess: () => {
      toast.success("La marque de cosmétiques a bien été modifiée");
      queryClient.invalidateQueries({
        queryKey: cosmeticsKeys.lists(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateCosmetic };
}
