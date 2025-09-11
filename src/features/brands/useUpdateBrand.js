import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateBrand as updateBrandApi,
  uploadBrandLogo,
  deleteBrandLogo,
} from "@/services/apiBrands";
import { brandsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateBrand() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateBrand } = useMutation({
    mutationFn: async ({ id, newData }) => {
      const { parent_id, name, logo_path } = newData;
      return Promise.all([
        updateBrandApi(id, { parent_id: parent_id, name: name }),
        logo_path ? uploadBrandLogo(id, logo_path) : deleteBrandLogo(id),
      ]);
    },
    onSuccess: () => {
      toast.success("La marque a bien été modifiée");
      return queryClient.invalidateQueries({
        queryKey: brandsKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateBrand };
}
