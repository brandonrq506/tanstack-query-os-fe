import { MOVIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { MoviePreview } from "../../types/movie-preview";

export const getMovies = async () => {
  const response = await apiV1.get<MoviePreview[]>(MOVIES_ENDPOINT);
  return response.data;
};
