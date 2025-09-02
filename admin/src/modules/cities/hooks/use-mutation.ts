import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CITIES_QUERY_KEY, citiesApi } from "@/api/crud/citites";
import { ICityCreateDto } from "@/api/crud/citites/types";

export const useCitiesMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: ICityCreateDto) => {
      return citiesApi.createCity(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CITIES_QUERY_KEY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return citiesApi.deleteCity(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CITIES_QUERY_KEY] });
    },
  });

  return {
    createCity: createMutation.mutate,
    deleteCity: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
