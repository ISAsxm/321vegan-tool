import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "@/services/apiUsers";
import { usersKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("L'utilisateurice a bien été supprimé.e");
      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser };
}
