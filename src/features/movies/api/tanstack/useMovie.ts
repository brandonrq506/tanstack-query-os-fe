import { useQuery } from "@tanstack/react-query";

import { getMovie } from "../axios/getMovie";
import { movieKeyFactory } from "../movie-key-factory";

export const useMovie = (movieId: number) => {
  return useQuery({
    queryKey: movieKeyFactory.detail(movieId),
    queryFn: ({ signal }) => getMovie({ signal, movieId }),
    enabled: Boolean(movieId),
  });
};
