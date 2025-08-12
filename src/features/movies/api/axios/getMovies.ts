import type { MoviePreview } from "../../types/movie-preview";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";
import type { movieKeyFactory } from "../movie-key-factory";

export const getMovies = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof movieKeyFactory.list>>) => {
  const { endpoint, filter, sort } = queryKey[0];

  const response = await apiV1.get<MoviePreview[]>(endpoint, {
    signal,
    params: { filter, sort },
  });
  return response.data;
};
