import { useQuery } from "@tanstack/react-query";

import { PICTURES_QUERY_KEY, picturesApi } from "@/api/crud/pictures";

export const usePicturesQuery = () => {
  return useQuery({
    queryKey: [PICTURES_QUERY_KEY],
    queryFn: async () => {
      return picturesApi.getPictures();
    },
  });
};
