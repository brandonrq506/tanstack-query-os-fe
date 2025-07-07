interface Props {
  title: string;
  imageUrl: string;
}

export const MovieCard = ({ title, imageUrl }: Props) => {
  return (
    <div className="w-full max-w-xs cursor-pointer overflow-hidden rounded-lg shadow transition-transform duration-300 hover:scale-105">
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="h-48 w-full object-cover"
        width={320}
        height={192}
      />
    </div>
  );
};
