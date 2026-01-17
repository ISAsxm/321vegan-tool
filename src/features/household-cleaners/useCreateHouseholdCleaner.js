import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHouseholdCleaner as createHouseholdCleanerApi } from "@/services/apiHouseholdCleaners";
import { householdCleanersKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateHouseholdCleaner() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createHouseholdCleaner } = useMutation(
    {
      mutationFn: createHouseholdCleanerApi,
      onSuccess: () => {
        toast.success("La marque de produit de nettoyage a bien été créée");
        queryClient.invalidateQueries({
          queryKey: householdCleanersKeys.all(),
        });
      },
      onError: (err) => toast.error(err.message),
    },
  );

  return { isCreating, createHouseholdCleaner };
}
