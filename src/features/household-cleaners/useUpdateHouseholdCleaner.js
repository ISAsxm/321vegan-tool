import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHouseholdCleaner as updateHouseholdCleanerApi } from "@/services/apiHouseholdCleaners";
import { householdCleanersKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateHouseholdCleaner() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateHouseholdCleaner } = useMutation(
    {
      mutationFn: ({ id, newData }) => updateHouseholdCleanerApi(id, newData),
      onSuccess: () => {
        toast.success("La marque de produit de nettoyage a bien été modifiée");
        queryClient.invalidateQueries({
          queryKey: householdCleanersKeys.all(),
        });
      },
      onError: (err) => toast.error(err.message),
    },
  );

  return { isUpdating, updateHouseholdCleaner };
}
