import { useMutation, useQueryClient } from "@tanstack/react-query";

import { USERS_QUERY_KEY, usersApi } from "@/api/crud/users";
import { IUserCreateDto, IUserUpdateDto } from "@/api/crud/users/types";

export const useUsersMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: IUserCreateDto) => {
      return usersApi.createUser(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: IUserUpdateDto) => {
      return usersApi.updateUser(data.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return usersApi.deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });

  return {
    createUser: createMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
