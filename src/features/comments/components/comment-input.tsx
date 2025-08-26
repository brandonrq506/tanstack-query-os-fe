import { useForm } from "react-hook-form";

import { Button } from "@/components/core";
import { TextArea } from "@/components/form";

interface CommentFormData {
  body: string;
}

interface Props {
  initialValues: CommentFormData;
  onSubmit: (data: CommentFormData) => void;
}

export const CommentInput = ({ initialValues, onSubmit }: Props) => {
  const { formState, handleSubmit, register, watch } = useForm<CommentFormData>(
    {
      values: initialValues,
    },
  );
  const { isSubmitting, errors } = formState;

  const watchedBody = watch("body");
  const hasChanges = watchedBody !== initialValues.body;

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
          disabled={isSubmitting || !hasChanges}>
          Post
        </Button>
      </div>
    </form>
  );
};
