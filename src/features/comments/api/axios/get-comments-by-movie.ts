import { MOVIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { CommentModel } from "../../types/comment-model";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { commentKeyFactory } from "../comment-key-factory";

export const getCommentsByMovieId = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof commentKeyFactory.list>>) => {
  const { movieId, endpoint } = queryKey[0];

  const URL = `${MOVIES_ENDPOINT}/${movieId}${endpoint}`;

  const response = await apiV1.get<CommentModel[]>(URL, { signal });
  return response.data;
};
