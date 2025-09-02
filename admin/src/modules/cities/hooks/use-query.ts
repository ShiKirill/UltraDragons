import { useQuery } from "@tanstack/react-query";

import { CITIES_QUERY_KEY, citiesApi } from "@/api/crud/citites";

export const useCitiesQuery = () => {
  return useQuery({
    queryKey: [CITIES_QUERY_KEY],
    queryFn: async () => {
      return citiesApi.getCities();
    },
  });
};
