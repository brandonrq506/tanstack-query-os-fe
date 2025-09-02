import { queryOptions } from "@tanstack/react-query";

import { commentKeyFactory } from "../comment-key-factory";
import { getCommentsByMovieId } from "../axios/get-comments-by-movie";

export const commentsByMovieOptions = (movieId: number) => {
  return queryOptions({
    queryKey: commentKeyFactory.list({ movieId }),
    queryFn: getCommentsByMovieId,
  });
};
