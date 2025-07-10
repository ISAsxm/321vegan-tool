import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "@/services/apiAuth";
import { USER_ROLES } from "@/utils/constants";
import toast from "react-hot-toast";

function transformUserRole(data) {
  const newData = { ...data, roles: USER_ROLES[data.role].roles };
  return newData;
}

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: (data) => {
      toast.success("Votre compte a bien été modifié");
      queryClient.setQueryData(["user"], transformUserRole(data));
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateCurrentUser };
}
