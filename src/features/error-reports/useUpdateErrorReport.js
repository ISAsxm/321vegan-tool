import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateErrorReport as updateErrorReportApi } from "@/services/apiErrorReports";
import { errorReportsKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateErrorReport() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateErrorReport } = useMutation({
    mutationFn: ({ id, newData }) => updateErrorReportApi(id, newData),
    onSuccess: () => {
      toast.success("Le rapport d'erreur a bien été modifié");
      queryClient.invalidateQueries({
        queryKey: errorReportsKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateErrorReport };
}
