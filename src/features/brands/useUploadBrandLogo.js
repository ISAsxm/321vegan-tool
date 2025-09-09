import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadBrandLogo as uploadBrandLogoApi } from "@/services/apiBrands";
import { brandsKeys } from "./queryKeyFactory";

export function useUploadBrandLogo() {
  const queryClient = useQueryClient();

  const {
    isPending: isUploading,
    mutate: uploadBrandLogo,
    error,
  } = useMutation({
    mutationFn: ({ id, logoFile }) => uploadBrandLogoApi(id, logoFile),
    onSuccess: (data) => {
      toast.success(`Logo de la marque ajouté !`);
      queryClient.invalidateQueries({
        queryKey: brandsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUploading, uploadBrandLogo, error };
}
