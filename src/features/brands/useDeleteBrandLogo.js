import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBrandLogo as deleteBrandLogoApi } from "@/services/apiBrands";
import { brandsKeys } from "./queryKeyFactory";

export function useDeleteBrandLogo() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeleting,
    mutate: deleteBrandLogo,
    error,
  } = useMutation({
    mutationFn: (id) => deleteBrandLogoApi(id),
    onSuccess: (data) => {
      toast.success(`Logo de la marque supprimé !`);
      queryClient.invalidateQueries({
        queryKey: brandsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBrandLogo, error };
}
