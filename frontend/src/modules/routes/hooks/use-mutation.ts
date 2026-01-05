import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ROUTES_QUERY_KEY, routesApi } from "@/api/services/routes";

export const useRoutesMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (sessionId: number) => {
      return routesApi.createRoute(sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ROUTES_QUERY_KEY],
      });
    },
  });

  return {
    createRoute: createMutation.mutate,
    isLoading: createMutation.isPending,
  };
};
