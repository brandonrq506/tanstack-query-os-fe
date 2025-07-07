import type { BaseEntity } from "@/types";

export interface MovieModel extends BaseEntity {
  duration_secs: number;
  genre_id: number;
  is_featured: boolean;
  published_at: string;
  sinopsis: string;
  thumbnail_url: string;
  title: string;
  trailer_url: string;
}
