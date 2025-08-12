import type { MovieModel } from "../../types/movie-model";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";
import type { movieKeyFactory } from "../movie-key-factory";

export const getMovie = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof movieKeyFactory.detail>>) => {
  const { endpoint, movieId } = queryKey[0];

  const URL = `${endpoint}/${movieId}`;

  const response = await apiV1.get<MovieModel>(URL, { signal });
  return response.data;
};
