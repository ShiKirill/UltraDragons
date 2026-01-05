import { useQuery } from "@tanstack/react-query";

import { INTERESTS_QUERY_KEY, interestsApi } from "@/api/services/interests";

export const useInterestsQuery = () => {
  return useQuery({
    queryKey: [INTERESTS_QUERY_KEY],
    queryFn: async () => {
      return interestsApi.getInterests();
    },
  });
};
