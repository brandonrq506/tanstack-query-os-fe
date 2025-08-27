import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteComment } from "../api/tanstack/use-delete-comment";

interface Props {
  commentId: number;
}

export const DeleteComment = ({ commentId }: Props) => {
  const { mutate } = useDeleteComment();

  const handleDelete = () => {
    mutate(commentId);
  };

  return (
    <button
      className="text-gray-400 transition-colors hover:text-red-600"
      onClick={handleDelete}>
      <TrashIcon className="size-4" />
    </button>
  );
};
