import { COMMENTS_ENDPOINT, apiV1 } from "@/libs/axios";

export const deleteComment = async (commentId: number) => {
  const URL = `${COMMENTS_ENDPOINT}/${commentId}`;
  await apiV1.delete(URL);
};
