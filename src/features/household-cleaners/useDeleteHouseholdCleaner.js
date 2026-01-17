import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHouseholdCleaner as deleteHouseholdCleanerApi } from "@/services/apiHouseholdCleaners";
import { householdCleanersKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteHouseholdCleaner() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteHouseholdCleaner } = useMutation(
    {
      mutationFn: deleteHouseholdCleanerApi,
      onSuccess: (data, id) => {
        toast.success("La marque de produit de nettoyage a bien été supprimée");
        queryClient.removeQueries(householdCleanersKeys.detail(id));
        queryClient.invalidateQueries({
          queryKey: householdCleanersKeys.all(),
        });
      },
      onError: (err) => toast.error(err.message),
    },
  );

  return { isDeleting, deleteHouseholdCleaner };
}
