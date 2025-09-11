import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBrand as createBrandApi,
  uploadBrandLogo,
} from "@/services/apiBrands";
import { brandsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateBrand() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createBrand } = useMutation({
    mutationFn: async ({ parent_id, name, logo_path }) => {
      let brand = await createBrandApi({ parent_id: parent_id, name: name });
      if (logo_path) {
        brand = await uploadBrandLogo(brand.id, logo_path);
      }
      return Promise.resolve(brand);
    },
    onSuccess: () => {
      toast.success("La marque a bien été créée");
      return queryClient.invalidateQueries({
        queryKey: brandsKeys.all(),
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createBrand };
}
