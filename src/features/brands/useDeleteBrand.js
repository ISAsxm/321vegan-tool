import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrand as deleteBrandApi } from "@/services/apiBrands";
import { brandsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBrand } = useMutation({
    mutationFn: deleteBrandApi,
    onSuccess: () => {
      toast.success("La marque a bien été supprimée");
      return queryClient.invalidateQueries({
        queryKey: brandsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBrand };
}
