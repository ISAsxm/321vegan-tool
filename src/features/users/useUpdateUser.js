import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "@/services/apiUsers";
import { usersKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ id, newData }) => updateUserApi(id, newData),
    onSuccess: () => {
      toast.success("L'utilisateurice a bien été modifié.e");
      return queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
