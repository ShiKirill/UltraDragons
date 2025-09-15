import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PLACES_QUERY_KEY, placesApi } from "@/api/crud/places";
import { IPlaceCreateDto, IPlaceUpdateDto } from "@/api/crud/places/types";

export const usePlacesMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: IPlaceCreateDto) => {
      return placesApi.createPlace(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLACES_QUERY_KEY] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: IPlaceUpdateDto) => {
      return placesApi.updatePlace(data.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLACES_QUERY_KEY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return placesApi.deletePlace(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLACES_QUERY_KEY] });
    },
  });

  return {
    createPlace: createMutation.mutate,
    updatePlace: updateMutation.mutate,
    deletePlace: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
