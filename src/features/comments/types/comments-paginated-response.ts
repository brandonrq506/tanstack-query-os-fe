import type { CommentModel } from "./comment-model";
import type { PaginationMeta } from "@/types";

export interface CommentsPaginatedResponse {
  comments: CommentModel[];
  meta: PaginationMeta;
}
