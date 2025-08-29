import { useMutation, useQueryClient } from "@tanstack/react-query";

import { INTERESTS_QUERY_KEY, interestsApi } from "@/api/crud/interests";
import { IInterestCreateDto } from "@/api/crud/interests/types";

export const useInterestsMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: IInterestCreateDto) => {
      return interestsApi.createInterest(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTERESTS_QUERY_KEY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return interestsApi.deleteInterest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INTERESTS_QUERY_KEY] });
    },
  });

  return {
    createInterest: createMutation.mutate,
    deleteInterest: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
