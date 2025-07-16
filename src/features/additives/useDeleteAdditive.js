import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdditive as deleteAdditiveApi } from "@/services/apiAdditives";
import { additivesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteAdditive() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteAdditive } = useMutation({
    mutationFn: deleteAdditiveApi,
    onSuccess: () => {
      toast.success("L'additif a bien été supprimé");
      return queryClient.invalidateQueries({
        queryKey: additivesKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteAdditive };
}
