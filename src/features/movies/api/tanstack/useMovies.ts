import { useQuery } from "@tanstack/react-query";

import { MOVIES_ENDPOINT } from "@/libs/axios";
import { getMovies } from "../axios/getMovies";

export const useMovies = () => {
  return useQuery({
    queryKey: [MOVIES_ENDPOINT],
    queryFn: ({ signal }) => getMovies({ signal }),
  });
};
