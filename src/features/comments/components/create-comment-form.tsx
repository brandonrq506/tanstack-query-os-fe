import { useCreateComment } from "../api/tanstack/use-create-comment";

import { CommentInput } from "./comment-input";
import { type CreateCommentFormType } from "../types/create-comment-form-type";

interface Props {
  movieId: number;
}

export const CreateCommentForm = ({ movieId }: Props) => {
  const { mutate } = useCreateComment();

  const handleSubmit = ({ body }: CreateCommentFormType) => {
    mutate({ movieId, body });
  };

  return <CommentInput initialValues={{ body: "" }} onSubmit={handleSubmit} />;
};
