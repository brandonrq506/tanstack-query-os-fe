interface Props {
  title: string;
  imageUrl: string;
}

export const MovieCard = ({ title, imageUrl }: Props) => {
  return (
    <img
      src={imageUrl}
      alt={title}
      loading="lazy"
      className="aspect-video w-full max-w-xs cursor-pointer overflow-hidden rounded-md object-cover shadow transition-transform duration-300 hover:scale-105"
    />
  );
};
