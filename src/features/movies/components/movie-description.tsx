import { Card } from "@/components/layout";
import type { MovieModel } from "../types/movie-model";

const SECS_IN_MINUTE = 60;

interface Props {
  movie: MovieModel;
}

export const MovieDescription = ({ movie }: Props) => {
  const durationMin = Math.floor(movie.duration_secs / SECS_IN_MINUTE);
  const releaseYear = new Date(movie.published_at).getFullYear();

  return (
    <Card className="w-full flex-none border border-zinc-200 xl:basis-1/4">
      <h1 className="text-2xl font-extrabold text-nowrap text-zinc-900">
        {movie.title}
      </h1>
      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-600">
        <span>{releaseYear}</span>
        <span>{durationMin} min</span>
        {movie.is_featured && (
          <span className="inline-flex items-center rounded-full bg-yellow-200 px-3 py-1 text-xs font-medium text-yellow-800 shadow-sm">
            ⭐ Featured
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-zinc-600">
        <span className="font-medium text-zinc-800">Release Date:</span>{" "}
        {new Date(movie.published_at).toLocaleDateString()}
      </p>
      <div className="mt-4 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-800">Synopsis</h2>
        <p className="leading-relaxed tracking-wide text-zinc-700">
          {movie.sinopsis}
        </p>
      </div>
    </Card>
  );
};
