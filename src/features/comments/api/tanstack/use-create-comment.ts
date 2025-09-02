import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CommentModel } from "../../types/comment-model";
import { commentsByMovieOptions } from "../query-options/comments-by-movie-options";
import { createComment } from "../axios/create-comment";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onMutate: async ({ movieId, body }) => {
      // Do not invalidate the following query just yet!
      await queryClient.cancelQueries(commentsByMovieOptions(movieId));

      // This is just a helper
      const queryKey = commentsByMovieOptions(movieId).queryKey;

      // Obtain the previous (current) comments
      const prevComments = queryClient.getQueryData(queryKey);

      // New comment
      const newComment: CommentModel = {
        id: Date.now(),
        body,
        movie_id: movieId,
        author_color: "blue",
        author_name: "Temporary Otter",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Update cache optimistically
      queryClient.setQueryData(queryKey, (oldComments) => {
        if (!oldComments) return [newComment];
        return [newComment, ...oldComments];
      });

      return { prevComments };
    },

    onError: (_, { movieId }, context) => {
      // Rollback to the previous comments
      if (context?.prevComments) {
        queryClient.setQueryData(
          commentsByMovieOptions(movieId).queryKey,
          context.prevComments,
        );
      }
    },

    onSettled: (_, __, { movieId }) => {
      queryClient.invalidateQueries(commentsByMovieOptions(movieId));
    },
  });
};
