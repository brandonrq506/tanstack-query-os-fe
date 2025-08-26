import type { BaseEntity } from "@/types";

export interface CommentModel extends BaseEntity {
  movie_id: number;
  body: string;
  author_name: string;
  author_color: string;
}
