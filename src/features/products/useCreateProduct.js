import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "@/services/apiProducts";
import { productsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createProduct } = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      toast.success("Le produit a bien été créé");
      return queryClient.invalidateQueries({
        queryKey: productsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createProduct };
}
