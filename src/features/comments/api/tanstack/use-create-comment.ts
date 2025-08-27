import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentKeyFactory } from "../comment-key-factory";
import { createComment } from "../axios/create-comment";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeyFactory.all });
    },
  });
};
