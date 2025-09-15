import { Fragment } from "react/jsx-runtime";
import { usePaginatedCommentsByMovie } from "../api/tanstack/use-paginated-comments-by-movie";

import { Button, Loading } from "@/components/core";
import { CommentCard } from "./comment-card";
import { CreateCommentForm } from "./create-comment-form";
import { SectionHeader } from "@/components/layout";

type Props = {
  movieId: number;
};

export const CommentList = ({ movieId }: Props) => {
  const {
    data,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePaginatedCommentsByMovie({ movieId });

  if (isPending) return <Loading />;

  if (isError) return <p>Error loading comments</p>;

  const totalComments = data.pages[0].meta.total_count;

  const header = `Comments (${totalComments})`;

  return (
    <div>
      <SectionHeader title={header} className="mt-10" />
      <CreateCommentForm movieId={movieId} />
      <ul>
        {data.pages.map((page, index) => {
          return (
            <Fragment key={index}>
              {page.comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  className="my-2"
                />
              ))}
            </Fragment>
          );
        })}
      </ul>

      {hasNextPage && (
        <div className="flex w-full">
          <Button
            className="mx-auto"
            onClick={() => fetchNextPage()}
            disabled={isFetching}>
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};
