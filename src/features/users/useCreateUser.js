import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser as createUserApi } from "@/services/apiUsers";
import { usersKeys } from "./queryKeyFactory";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createUser } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success("L'utilisateurice a bien été créé.e");
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createUser };
}
