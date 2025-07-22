import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import { Loading } from "@/components/core";
import { MovieCard } from "@/features/movies/components";
import { PageHeader } from "@/components/layout";
import { getMovies } from "@/features/movies/api/axios/getMovies";

export const MoviesPage = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["movies"],
    queryFn: ({ signal }) => getMovies({ signal }),
  });

  if (isPending) return <Loading sizeStyles="size-10" className="mx-auto" />;

  if (isError) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-red-500">Error loading movie. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Explore our movie collection" />
      <br />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((movie) => (
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
