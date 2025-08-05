import { useQuery } from "@tanstack/react-query";

import type { MovieApiParams } from "../../types/movie-api-params";
import { getMovies } from "../axios/getMovies";
import { movieKeyFactory } from "../movie-key-factory";

export const useMovies = ({ filter, sort }: MovieApiParams) => {
  return useQuery({
    queryKey: movieKeyFactory.list({ filter, sort }),
    queryFn: ({ signal }) => getMovies({ signal }),
  });
};
