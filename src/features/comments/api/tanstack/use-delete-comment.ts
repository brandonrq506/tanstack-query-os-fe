import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

import { commentsByMovieOptions } from "../query-options/comments-by-movie-options";
import { deleteComment } from "../axios/delete-comment";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { movieId } = useParams();

  if (!movieId) throw new Error("movieId is required");

  const movie_id = Number(movieId);

  return useMutation({
    mutationFn: deleteComment,
    onMutate: async (commentId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(commentsByMovieOptions(movie_id));

      const queryKey = commentsByMovieOptions(movie_id).queryKey;

      // Snapshot the previous value
      const prevComments = queryClient.getQueryData(queryKey);

      // Optimistically remove the comment
      queryClient.setQueryData(queryKey, (old) => {
        if (!old) return old;
        return old.filter((c) => c.id !== commentId);
      });

      return { prevComments };
    },
    onError: (_, __, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.prevComments) {
        queryClient.setQueryData(
          commentsByMovieOptions(movie_id).queryKey,
          context.prevComments,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(commentsByMovieOptions(movie_id));
    },
  });
};
