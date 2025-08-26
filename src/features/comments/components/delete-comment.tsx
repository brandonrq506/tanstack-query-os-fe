import { TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  commentId: number;
}

export const DeleteComment = ({ commentId }: Props) => {
  const handleDelete = () => {
    console.log("Deleting comment with ID:", commentId);
  };

  return (
    <button
      className="text-gray-400 transition-colors hover:text-red-600"
      onClick={handleDelete}>
      <TrashIcon className="size-4" />
    </button>
  );
};
