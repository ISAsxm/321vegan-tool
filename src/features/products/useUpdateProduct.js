import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct as updateProductApi } from "@/services/apiProducts";
import { productsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateProduct } = useMutation({
    mutationFn: ({ id, newData }) => updateProductApi(id, newData),
    onSuccess: () => {
      toast.success("Le produit a bien été modifié");
      queryClient.invalidateQueries({
        queryKey: productsKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateProduct };
}
