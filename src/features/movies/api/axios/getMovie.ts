import { MOVIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { MovieModel } from "../../types/movie-model";

export const getMovie = async (id: number) => {
  const URL = `${MOVIES_ENDPOINT}/${id}`;

  const response = await apiV1.get<MovieModel>(URL);
  return response.data;
};
