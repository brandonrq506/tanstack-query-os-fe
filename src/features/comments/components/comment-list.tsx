import { Loading } from "@/components/core";
import { useCommentsByMovie } from "../api/tanstack/use-comments-by-movie";

import { CommentCard } from "./comment-card";
import { CreateCommentForm } from "./create-comment-form";
import { SectionHeader } from "@/components/layout";

type Props = {
  movieId: number;
};

export const CommentList = ({ movieId }: Props) => {
  const { data, isPending, isError } = useCommentsByMovie(movieId);

  if (isPending) return <Loading />;

  if (isError) return <p>Error loading comments</p>;

  return (
    <div>
      <SectionHeader title="Comments" className="mt-10" />
      <CreateCommentForm />
      <ul>
        {data.map((comment) => (
          <CommentCard key={comment.id} comment={comment} className="my-2" />
        ))}
      </ul>
    </div>
  );
};
