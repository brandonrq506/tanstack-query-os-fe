import { useParams } from "react-router";

import { Loading } from "@/components/core";
import { MovieDescription } from "@/features/movies/components";
import { getMovie } from "@/features/movies/api/axios/getMovie";
import { useQuery } from "@tanstack/react-query";

export const MoviePage = () => {
  const { movieId } = useParams();

  const {
    isPending,
    isError,
    data: movie,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: ({ signal }) => getMovie({ movieId: Number(movieId), signal }),
    enabled: Boolean(movieId),
  });

  if (isPending) return <Loading sizeStyles="size-10" className="mx-auto" />;

  if (isError) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-red-500">Error loading movie. Please try again.</p>
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
  );
};
