import { CommentAuthor } from "./comment-author";
import type { CommentModel } from "../types/comment-model";
import { DeleteComment } from "./delete-comment";

import clsx from "clsx";
import { formatRelative } from "date-fns";

interface Props {
  comment: CommentModel;
  className?: string;
}

export const CommentCard = ({ comment, className }: Props) => {
  return (
    <div
      className={clsx(
        "flex-auto rounded-md p-3 ring-1 ring-gray-200 ring-inset",
        className,
      )}>
      <div className="flex justify-between gap-x-4">
        <div className="flex items-center gap-x-3">
          <CommentAuthor
            authorName={comment.author_name}
            authorColor={comment.author_color}
          />
          <div className="py-0.5 text-xs/5 text-gray-500">
            <span className="font-medium text-gray-900">
              {comment.author_name}
            </span>{" "}
            commented
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <time
            dateTime={comment.created_at}
            className="flex-none py-0.5 text-xs/5 text-gray-500">
            {formatRelative(comment.created_at, new Date())}
          </time>
          <DeleteComment commentId={comment.id} />
        </div>
      </div>
      <p className="mt-2 text-sm/6 text-gray-500">{comment.body}</p>
    </div>
  );
};
