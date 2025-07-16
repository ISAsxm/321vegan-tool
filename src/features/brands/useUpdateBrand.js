import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBrand as updateBrandApi } from "@/services/apiBrands";
import { brandsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateBrand() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateBrand } = useMutation({
    mutationFn: ({ id, newData }) => updateBrandApi(id, newData),
    onSuccess: () => {
      toast.success("La marque a bien été modifiée");
      return queryClient.invalidateQueries({
        queryKey: brandsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateBrand };
}
