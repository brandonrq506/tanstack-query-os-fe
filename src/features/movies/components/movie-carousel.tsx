import { useMovies } from "../api/tanstack/useMovies";
import { usePrefetchMovie } from "../api/tanstack/usePrefetchMovie";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";
import { Carousel } from "@/components/core";
import { Link } from "react-router";
import type { MovieApiParams } from "../types/movie-api-params";
import { MovieCard } from "./movie-card";

interface Props {
  params: MovieApiParams;
  title: string;
  className?: string;
}

export const MovieCarousel = ({
  title,
  className = "",
  params = {},
}: Props) => {
  const { data, isSuccess, isPending, isError, refetch } = useMovies(params);
  const prefetch = usePrefetchMovie();

  const isEmpty = isSuccess && data.length === 0;

  if (isPending) {
    return (
      <section className={`space-y-3 ${className}`}>
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        </header>
        <Carousel ariaLabel={title || "Movies loading"} itemClassName="w-48">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video w-full max-w-xs animate-pulse rounded-md object-cover select-none"
              aria-hidden="true">
              <div className="relative overflow-hidden rounded-md bg-neutral-800">
                <div className="aspect-video w-full bg-neutral-700" />
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={`space-y-3 ${className}`}>
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        </header>
        <Carousel
          ariaLabel={title || "Movies loading"}
          itemClassName="w-full"
          className="w-full rounded-md border border-dashed py-9">
          <div className="flex justify-center">
            <Button
              onClick={() => refetch()}
              className="text-md flex items-center gap-2 rounded-sm bg-indigo-600 px-2 py-1 font-semibold text-white">
              Retry
              <ArrowPathIcon className="size-4" />
            </Button>
          </div>
        </Carousel>
      </section>
    );
  }

  // Do not show to users
  if (isEmpty) return null;

  return (
    <section className={`space-y-1 ${className}`}>
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <span className="text-xs text-neutral-400">{data.length} items</span>
      </header>
      <Carousel ariaLabel={title || "Movies"} itemClassName="w-48">
        {data.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            onFocus={() => prefetch(movie.id)}
            onMouseEnter={() => prefetch(movie.id)}>
            <MovieCard title={movie.title} imageUrl={movie.thumbnail_url} />
          </Link>
        ))}
      </Carousel>
    </section>
  );
};
