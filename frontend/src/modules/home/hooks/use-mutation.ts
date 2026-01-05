import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  SELECTION_SESSION_QUERY_KEY,
  selectionSessionApi,
} from "@/api/services/selection-session";
import { ISelectionSessionCreateDto } from "@/api/services/selection-session/types";

export const useSelectionSessionMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: ISelectionSessionCreateDto) => {
      return selectionSessionApi.createSelectionSession(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SELECTION_SESSION_QUERY_KEY],
      });
    },
  });

  return {
    createSelectionSession: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};
