import { useQuery } from "@tanstack/react-query";

import { commentKeyFactory } from "../comment-key-factory";
import { getCommentsByMovieId } from "../axios/get-comments-by-movie";

export const useCommentsByMovie = (movieId: number) => {
  return useQuery({
    queryKey: commentKeyFactory.list({ movieId }),
    queryFn: getCommentsByMovieId,
    enabled: Boolean(movieId),
  });
};
