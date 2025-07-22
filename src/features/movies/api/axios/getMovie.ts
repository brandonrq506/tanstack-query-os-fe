import { MOVIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { MovieModel } from "../../types/movie-model";

interface Props {
  movieId: number;
  signal?: AbortSignal;
}

export const getMovie = async ({ movieId, signal }: Props) => {
  const URL = `${MOVIES_ENDPOINT}/${movieId}`;

  const response = await apiV1.get<MovieModel>(URL, { signal });
  return response.data;
};
