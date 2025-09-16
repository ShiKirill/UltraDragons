import { useQuery } from "@tanstack/react-query";

import { PLACES_QUERY_KEY, placesApi } from "@/api/crud/places";

export const usePlacesQuery = () => {
  return useQuery({
    queryKey: [PLACES_QUERY_KEY],
    queryFn: async () => {
      return placesApi.getPlaces();
    },
  });
};
