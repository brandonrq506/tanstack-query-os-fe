import { COMMENTS_ENDPOINT, MOVIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { CommentModel } from "../../types/comment-model";

interface Props {
  movieId: number;
  body: string;
}

export const createComment = async ({ movieId, body }: Props) => {
  const URL = `${MOVIES_ENDPOINT}/${movieId}${COMMENTS_ENDPOINT}`;

  const response = await apiV1.post<CommentModel>(URL, { body });
  return response.data;
};
