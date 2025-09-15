import { useInfiniteQuery } from "@tanstack/react-query";

import { DEFAULT_PAGE } from "@/utils/pagination";
import type { PaginationApiParams } from "../../types/pagination-api-params";
import { commentKeyFactory } from "../comment-key-factory";
import { getCommentsByMovieV2 } from "../axios/get-comments-by-movie-v2";

export const usePaginatedCommentsByMovie = ({
  movieId,
  per_page,
}: PaginationApiParams) => {
  return useInfiniteQuery({
    queryKey: commentKeyFactory.paginatedList({ movieId, per_page }),
    queryFn: getCommentsByMovieV2,
    initialPageParam: DEFAULT_PAGE,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
};

// hasNextPage,
