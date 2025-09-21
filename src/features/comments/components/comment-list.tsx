import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import { CommentCard } from "./comment-card";
import { CreateCommentForm } from "./create-comment-form";
import { Fragment } from "react/jsx-runtime";
import { Loading } from "@/components/core";
import { SectionHeader } from "@/components/layout";
import { paginatedCommentsByMovieOptions } from "../api/query-options/paginated-comments-by-movie-options";

type Props = {
  movieId: number;
};

export const CommentList = ({ movieId }: Props) => {
  const { ref, inView } = useInView({ rootMargin: "500px 0px" });

  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(paginatedCommentsByMovieOptions({ movieId }));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

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

      {!isFetchingNextPage && <div ref={ref}></div>}
    </div>
  );
};
