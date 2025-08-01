import type { MovieFilterParams } from "./movie-filter-params";
import type { MovieSortParams } from "./movie-sort-params";

export interface MovieApiParams {
  filter?: Partial<MovieFilterParams>;
  sort?: Partial<MovieSortParams>;
}
