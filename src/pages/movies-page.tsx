import { useMovies } from "@/features/movies/api/tanstack/useMovies";

import { Loading } from "@/components/core";
import { MovieCardLink } from "@/features/movies/components";
import { PageHeader } from "@/components/layout";

export const MoviesPage = () => {
  const { isPending, isError, data } = useMovies({});

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
            <MovieCardLink movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};
