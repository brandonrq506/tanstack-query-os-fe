import { useEffect, useState } from "react";

import { Link } from "react-router";
import { Loading } from "@/components/core";
import { MovieCard } from "@/features/movies/components";
import type { MoviePreview } from "@/features/movies/types/movie-preview";
import { PageHeader } from "@/components/layout";
import { getMovies } from "@/features/movies/api/axios/getMovies";

export const MoviesPage = () => {
  const [movies, setMovies] = useState<MoviePreview[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  if (movies.length === 0) {
    return (
      <div>
        <PageHeader title="Explore our movie collection" />
        <br />
        <Loading sizeStyles="size-16" className="m-auto" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Explore our movie collection" />
      <br />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <MovieCard title={movie.title} imageUrl={movie.thumbnail_url} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
