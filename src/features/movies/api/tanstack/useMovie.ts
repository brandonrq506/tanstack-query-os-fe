import { useQuery } from "@tanstack/react-query";

import { MOVIES_ENDPOINT } from "@/libs/axios";
import { getMovie } from "../axios/getMovie";

export const useMovie = (movieId: number) => {
  return useQuery({
    queryKey: [MOVIES_ENDPOINT, movieId],
    queryFn: ({ signal }) => getMovie({ signal, movieId }),
    enabled: Boolean(movieId),
  });
};
