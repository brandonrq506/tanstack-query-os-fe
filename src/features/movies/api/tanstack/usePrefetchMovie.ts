import { useQueryClient } from "@tanstack/react-query";

import { getMovie } from "../axios/getMovie";
import { movieKeyFactory } from "../movie-key-factory";

export const usePrefetchMovie = () => {
  const queryClient = useQueryClient();

  const prefetch = (movieId: number) => {
    queryClient.prefetchQuery({
      queryKey: movieKeyFactory.detail(movieId),
      queryFn: ({ signal }) => getMovie({ signal, movieId }),
    });
  };

  return prefetch;
};
