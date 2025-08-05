import { MOVIES_ENDPOINT } from "@/libs/axios";
import type { MovieApiParams } from "../types/movie-api-params";

export const movieKeyFactory = {
  all: [{ endpoint: MOVIES_ENDPOINT }] as const,
  lists: () => [{ ...movieKeyFactory.all[0], entity: "list" }] as const,
  list: ({ filter = {}, sort = {} }: MovieApiParams) =>
    [{ ...movieKeyFactory.lists()[0], filter, sort }] as const,
  details: () => [{ ...movieKeyFactory.all[0], entity: "detail" }] as const,
  detail: (movieId: number) =>
    [{ ...movieKeyFactory.details()[0], movieId }] as const,
};
