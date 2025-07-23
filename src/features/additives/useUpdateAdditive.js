import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdditive as updateAdditiveApi } from "@/services/apiAdditives";
import { additivesKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateAdditive() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateAdditive } = useMutation({
    mutationFn: ({ id, newData }) => updateAdditiveApi(id, newData),
    onSuccess: () => {
      toast.success("L'additif a bien été modifié");
      queryClient.invalidateQueries({
        queryKey: additivesKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateAdditive };
}
