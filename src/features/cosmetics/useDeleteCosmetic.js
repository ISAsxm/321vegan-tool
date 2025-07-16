import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCosmetic as deleteCosmeticApi } from "@/services/apiCosmetics";
import { cosmeticsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteCosmetic() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCosmetic } = useMutation({
    mutationFn: deleteCosmeticApi,
    onSuccess: () => {
      toast.success("La marque de cosmétiques a bien été supprimée");
      return queryClient.invalidateQueries({
        queryKey: cosmeticsKeys.lists(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCosmetic };
}
