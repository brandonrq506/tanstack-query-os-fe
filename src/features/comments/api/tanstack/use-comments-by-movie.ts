import { useQuery } from "@tanstack/react-query";

import { commentKeyFactory } from "../comment-key-factory";
import { getCommentsByMovieId } from "../axios/get-comments-by-movie";

const INTERVAL_MILLISECONDS = 30_000;

export const useCommentsByMovie = (movieId: number) => {
  return useQuery({
    queryKey: commentKeyFactory.list({ movieId }),
    queryFn: getCommentsByMovieId,
    enabled: Boolean(movieId),
    refetchInterval: INTERVAL_MILLISECONDS,
  });
};
