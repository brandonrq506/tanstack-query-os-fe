import { AppProvider } from "./provider";

import { MainErrorLayout, MainLayout } from "@/components/layout";
import { HomePage } from "@/pages/home-page";
import { MoviePage } from "@/pages/movie-page";
import { MoviesPage } from "@/pages/movies-page";

import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <MainErrorLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "movies/:movieId",
        element: <MoviePage />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};
