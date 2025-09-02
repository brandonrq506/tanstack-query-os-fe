import { useQuery } from "@tanstack/react-query";

import { commentsByMovieOptions } from "../query-options/comments-by-movie-options";

const INTERVAL_MILLISECONDS = 30_000;

export const useCommentsByMovie = (movieId: number) => {
  return useQuery({
    ...commentsByMovieOptions(movieId),
    enabled: Boolean(movieId),
    refetchInterval: INTERVAL_MILLISECONDS,
  });
};
