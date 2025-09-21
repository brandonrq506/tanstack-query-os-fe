/* eslint-disable max-lines-per-function */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CommentModel } from "../../types/comment-model";
import { createComment } from "../axios/create-comment";
import { paginatedCommentsByMovieOptions } from "../query-options/paginated-comments-by-movie-options";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onMutate: async ({ movieId, body }) => {
      const queryOptions = paginatedCommentsByMovieOptions({ movieId });

      // Do not invalidate the following query just yet!
      await queryClient.cancelQueries(queryOptions);

      // This is just a helper
      const queryKey = queryOptions.queryKey;

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
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;

        const newTotalCount = (oldData.pages[0]?.meta.total_count ?? 0) + 1;

        const pages = oldData.pages.map((page, index) => {
          if (index === 0) {
            return {
              ...page,
              comments: [newComment, ...page.comments],
              meta: {
                ...page.meta,
                total_count: newTotalCount,
              },
            };
          }

          return {
            ...page,
            meta: {
              ...page.meta,
              total_count: newTotalCount,
            },
          };
        });

        return {
          ...oldData,
          pages,
        };
      });

      return { prevComments };
    },

    onError: (_, { movieId }, context) => {
      // Rollback to the previous comments
      if (context?.prevComments) {
        queryClient.setQueryData(
          paginatedCommentsByMovieOptions({ movieId }).queryKey,
          context.prevComments,
        );
      }
    },

    onSettled: (_, __, { movieId }) => {
      queryClient.invalidateQueries(
        paginatedCommentsByMovieOptions({ movieId }),
      );
    },
  });
};
