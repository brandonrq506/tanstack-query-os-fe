import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { TextArea } from "@/components/form";

import { type CreateCommentFormType } from "../types/create-comment-form-type";

interface Props {
  initialValues: CreateCommentFormType;
  onSubmit: (data: CreateCommentFormType) => void;
}

export const CommentInput = ({ initialValues, onSubmit }: Props) => {
  const { formState, handleSubmit, register, reset } =
    useForm<CreateCommentFormType>({
      values: initialValues,
    });
  const { isSubmitting, isDirty, errors } = formState;

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}>
      <TextArea
        label="Write a comment"
        placeholder="Share your thoughts about this movie..."
        registration={register("body", {
          required: "Comment cannot be empty",
        })}
        error={errors.body?.message}
      />

      <div className="mt-2 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || !isDirty}>
          Post
        </Button>
      </div>
    </form>
  );
};
