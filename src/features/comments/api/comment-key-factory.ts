import { COMMENTS_ENDPOINT } from "@/libs/axios";

export const commentKeyFactory = {
  all: [{ endpoint: COMMENTS_ENDPOINT }] as const,
  lists: () => [{ ...commentKeyFactory.all[0], entity: "list" }] as const,
  list: ({ movieId }: { movieId: number }) =>
    [{ ...commentKeyFactory.lists()[0], movieId }] as const,
  details: () => [{ ...commentKeyFactory.all[0], entity: "detail" }] as const,
  detail: (commentId: number) =>
    [{ ...commentKeyFactory.details()[0], commentId }] as const,
};
