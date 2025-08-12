import { usePrefetchMovie } from "../api/tanstack/usePrefetchMovie";

import { Link } from "react-router";
import { MovieCard } from "./movie-card";
import type { MoviePreview } from "../types/movie-preview";

interface Props {
  movie: MoviePreview;
}

export const MovieCardLink = ({ movie }: Props) => {
  const prefetch = usePrefetchMovie();

  return (
    <Link
      to={`/movies/${movie.id}`}
      onFocus={() => prefetch(movie.id)}
      onMouseEnter={() => prefetch(movie.id)}>
      <MovieCard title={movie.title} imageUrl={movie.thumbnail_url} />
    </Link>
  );
};
