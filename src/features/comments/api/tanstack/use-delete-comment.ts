import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentKeyFactory } from "../comment-key-factory";
import { deleteComment } from "../axios/delete-comment";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeyFactory.all });
    },
  });
};
