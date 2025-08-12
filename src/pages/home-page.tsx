import { MovieCarousel } from "@/features/movies/components";

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <MovieCarousel
        title="Popular Movies"
        params={{
          filter: { is_featured: true },
          sort: { sort_by: "duration_secs", sort_order: "desc" },
        }}
      />

      <MovieCarousel
        title="Action Movies"
        params={{ filter: { genre_name: "Action" } }}
      />

      <MovieCarousel
        title="Animation Movies"
        params={{ filter: { genre_name: "Animation" } }}
      />

      <MovieCarousel
        title="Comedy Movies"
        params={{ filter: { genre_name: "Comedy" } }}
      />

      <MovieCarousel
        title="Horror Movies"
        params={{ filter: { genre_name: "Horror" } }}
      />

      <MovieCarousel
        title="Drama Movies"
        params={{ filter: { genre_name: "Drama" } }}
      />
    </div>
  );
};
