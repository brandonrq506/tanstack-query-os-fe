import { useMovie } from "@/features/movies/api/tanstack/useMovie";
import { useParams } from "react-router";

import { CommentList } from "@/features/comments/components";
import { Loading } from "@/components/core";
import { MovieDescription } from "@/features/movies/components";

export const MoviePage = () => {
  const { movieId } = useParams();

  const {
    isPending,
    isError,
    data: movie,
    refetch,
  } = useMovie(Number(movieId));

  if (isPending) return <Loading sizeStyles="size-10" className="mx-auto" />;

  if (isError) {
    return (
      <div className="flex min-h-[200px] items-center justify-center gap-2">
        <p className="text-red-500">Error loading movie. Please try again.</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (!movie)
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p>Movie not found.</p>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="w-full flex-none xl:basis-3/4">
          <img
            src={movie.thumbnail_url}
            alt={`${movie.title} thumbnail`}
            className="aspect-video max-h-[500px] w-full rounded-md object-cover"
          />
        </div>

        <MovieDescription movie={movie} />
      </div>
      <CommentList movieId={movie.id} />
    </div>
  );
};
