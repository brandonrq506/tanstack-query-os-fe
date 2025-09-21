import { infiniteQueryOptions } from "@tanstack/react-query";

import { commentKeyFactory } from "../comment-key-factory";
import { getCommentsByMovieV2 } from "../axios/get-comments-by-movie-v2";

import { DEFAULT_PAGE } from "@/utils/pagination";
import type { PaginationApiParams } from "../../types/pagination-api-params";

export const paginatedCommentsByMovieOptions = ({
  movieId,
  per_page,
}: PaginationApiParams) => {
  return infiniteQueryOptions({
    queryKey: commentKeyFactory.paginatedList({ movieId, per_page }),
    queryFn: getCommentsByMovieV2,
    initialPageParam: DEFAULT_PAGE,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
};
