import { MOVIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { MoviePreview } from "../../types/movie-preview";

interface Props {
  signal?: AbortSignal;
}

export const getMovies = async ({ signal }: Props) => {
  const response = await apiV1.get<MoviePreview[]>(MOVIES_ENDPOINT, { signal });
  return response.data;
};
