import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PICTURES_QUERY_KEY, picturesApi } from "@/api/crud/pictures";

export const usePicturesMutation = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return picturesApi.deletePicture(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PICTURES_QUERY_KEY] });
    },
  });

  return {
    deletePicture: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
