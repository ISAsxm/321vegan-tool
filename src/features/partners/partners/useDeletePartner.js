import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deletePartner as deletePartnerApi,
  deletePartnerLogo,
} from "@/services/apiPartners";
import { partnersKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeletePartner() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deletePartner } = useMutation({
    mutationFn: async (id) => {
      return Promise.all([deletePartnerLogo(id), deletePartnerApi(id)]);
    },
    onSuccess: () => {
      toast.success("La marque a bien été supprimée");
      return queryClient.invalidateQueries({
        queryKey: partnersKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePartner };
}
