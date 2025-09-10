import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChecking as updateCheckingApi } from "@/services/apiCheckings";
import { productsKeys } from "@/features/products/queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateChecking() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateChecking } = useMutation({
    mutationFn: ({ id, newData }) => updateCheckingApi(id, newData),
    onSuccess: () => {
      toast.success("La prise de contact a bien été modifiée");
      queryClient.invalidateQueries({
        queryKey: productsKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateChecking };
}
