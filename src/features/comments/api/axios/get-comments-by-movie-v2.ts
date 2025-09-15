import { MOVIES_ENDPOINT, apiV2 } from "@/libs/axios";

import type { CommentsPaginatedResponse } from "../../types/comments-paginated-response";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { commentKeyFactory } from "../comment-key-factory";

export const getCommentsByMovieV2 = async ({
  signal,
  queryKey,
  pageParam,
}: QueryFunctionContext<
  ReturnType<typeof commentKeyFactory.paginatedList>
>) => {
  const { movieId, per_page, endpoint } = queryKey[0];
  const url = `${MOVIES_ENDPOINT}/${movieId}${endpoint}`;

  const response = await apiV2.get<CommentsPaginatedResponse>(url, {
    signal,
    params: {
      page: pageParam,
      per_page,
    },
  });

  return response.data;
};
