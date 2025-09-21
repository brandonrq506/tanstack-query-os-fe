import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

import { deleteComment } from "../axios/delete-comment";
import { paginatedCommentsByMovieOptions } from "../query-options/paginated-comments-by-movie-options";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { movieId } = useParams();

  if (!movieId) throw new Error("movieId is required");

  const movie_id = Number(movieId);

  return useMutation({
    mutationFn: deleteComment,
    onMutate: async (commentId) => {
      const queryOptions = paginatedCommentsByMovieOptions({
        movieId: movie_id,
      });

      // Cancel any outgoing refetches
      await queryClient.cancelQueries(queryOptions);

      // Our helper
      const queryKey = queryOptions.queryKey;

      // Snapshot the previous value
      const prevComments = queryClient.getQueryData(queryKey);

      // Optimistically remove the comment
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;

        let removed = false;

        const pages = oldData.pages.map((page) => {
          if (removed) return page;

          const comments = page.comments.filter((c) => c.id !== commentId);

          if (comments.length === page.comments.length) return page;

          removed = true;

          return {
            ...page,
            comments,
          };
        });

        if (!removed) return oldData;

        return {
          ...oldData,
          pages,
        };
      });

      return { prevComments };
    },
    onError: (_, __, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.prevComments) {
        queryClient.setQueryData(
          paginatedCommentsByMovieOptions({ movieId: movie_id }).queryKey,
          context.prevComments,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(
        paginatedCommentsByMovieOptions({ movieId: movie_id }),
      );
    },
  });
};
