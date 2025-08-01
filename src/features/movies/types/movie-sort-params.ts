import type { SortOrder } from "@/types";

export const MOVIE_SORT_FIELDS = {
  title: "title",
  duration_secs: "duration_secs",
  genre_name: "genre_name",
  published_at: "published_at",
  created_at: "created_at",
  updated_at: "updated_at",
} as const;

export type MovieSortField = keyof typeof MOVIE_SORT_FIELDS;

export interface MovieSortParams {
  sort_by: MovieSortField;
  sort_order: SortOrder;
}
