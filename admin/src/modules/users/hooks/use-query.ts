import { useQuery } from "@tanstack/react-query";

import { USERS_QUERY_KEY, usersApi } from "@/api/crud/users";

export const useUsersQuery = () => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: async () => {
      return usersApi.getUsers();
    },
  });
};
