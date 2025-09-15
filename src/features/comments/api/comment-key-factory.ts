import { COMMENTS_ENDPOINT } from "@/libs/axios";
import { DEFAULT_PER_PAGE } from "@/utils/pagination";
import type { PaginationApiParams } from "../types/pagination-api-params";

export const commentKeyFactory = {
  all: [{ endpoint: COMMENTS_ENDPOINT }] as const,
  lists: () => [{ ...commentKeyFactory.all[0], entity: "list" }] as const,
  list: ({ movieId }: { movieId: number }) =>
    [{ ...commentKeyFactory.lists()[0], movieId }] as const,
  details: () => [{ ...commentKeyFactory.all[0], entity: "detail" }] as const,
  detail: (commentId: number) =>
    [{ ...commentKeyFactory.details()[0], commentId }] as const,
  paginatedLists: () =>
    [{ ...commentKeyFactory.all[0], entity: "paginated-list" }] as const,
  paginatedList: ({
    movieId,
    per_page = DEFAULT_PER_PAGE,
  }: PaginationApiParams) =>
    [{ ...commentKeyFactory.paginatedLists()[0], movieId, per_page }] as const,
};
