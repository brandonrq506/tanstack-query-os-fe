import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { MovieDescription } from "@/features/movies/components";
import type { MovieModel } from "@/features/movies/types/movie-model";
import { getMovie } from "@/features/movies/api/axios/getMovie";

export const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieModel | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      const data = await getMovie(Number(movieId));
      setMovie(data);
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return null;

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
