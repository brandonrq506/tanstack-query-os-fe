import { useState } from "react";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Modal } from "@/components/core";
import clsx from "clsx";

import { MOVIES_ENDPOINT, apiV1 } from "@/libs/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { MoviePreview } from "../types/movie-preview";
import { useDebounce } from "@/hooks";
import { useNavigate } from "react-router";
import { usePrefetchMovie } from "../api/tanstack/usePrefetchMovie";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const QUERY_MIN_LENGTH = 3;

export const MovieSearchModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const prefetch = usePrefetchMovie();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim());

  const { data, isSuccess, isPlaceholderData } = useQuery({
    queryKey: [MOVIES_ENDPOINT, debouncedQuery],
    queryFn: async ({ signal }) => {
      const response = await apiV1.get<MoviePreview[]>(MOVIES_ENDPOINT, {
        signal,
        params: {
          filter: {
            title: debouncedQuery,
          },
          sort: { sort_by: "title", order: "asc" },
        },
      });
      return response.data;
    },
    enabled: debouncedQuery.length >= QUERY_MIN_LENGTH,
    placeholderData: keepPreviousData,
  });

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const displayOptions =
    isSuccess && data.length > 0 && debouncedQuery.length >= QUERY_MIN_LENGTH;

  const notFound =
    isSuccess && data.length === 0 && debouncedQuery.length >= QUERY_MIN_LENGTH;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Combobox
        onChange={(selectedMovie: MoviePreview) => {
          handleClose();
          navigate(`/movies/${selectedMovie.id}`);
        }}>
        <div className="grid grid-cols-1">
          <ComboboxInput
            autoFocus
            autoComplete="off"
            className="col-start-1 row-start-1 h-12 w-full rounded-md pr-4 pl-11 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm"
            placeholder="Search..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <MagnifyingGlassIcon
            className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
            aria-hidden="true"
          />
        </div>

        {displayOptions && (
          <ComboboxOptions
            static
            className={clsx(
              "max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3",
              isPlaceholderData && "opacity-50",
            )}>
            {data.map((movie) => (
              <ComboboxOption
                key={movie.id}
                value={movie}
                onFocus={() => prefetch(movie.id)}
                onMouseEnter={() => prefetch(movie.id)}
                className="group flex cursor-default items-center rounded-xl p-3 select-none data-focus:bg-gray-100 data-focus:outline-hidden">
                <img
                  src={movie.thumbnail_url}
                  alt={movie.title}
                  className="aspect-video h-10 flex-none rounded-md"
                />

                <p className="ml-4 grow text-left text-sm font-medium text-gray-700 group-data-focus:text-gray-900">
                  {movie.title}
                </p>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}

        {notFound && (
          <div className="px-6 py-14 text-center text-sm sm:px-14">
            <MagnifyingGlassIcon className="mx-auto size-6 text-gray-400" />
            <p className="mt-4 font-semibold text-gray-900">No movies found!</p>
            <p className="mt-2 text-gray-500">
              Try searching for a different title.
            </p>
          </div>
        )}

        {!notFound && !displayOptions && (
          <div className="px-6 py-14 text-center text-sm sm:px-14">
            <MagnifyingGlassIcon className="mx-auto size-6 text-gray-400" />
            <p className="mt-4 font-semibold text-gray-900">
              Search by Typing!
            </p>
            <p className="mt-2 text-gray-500">
              Type at least {QUERY_MIN_LENGTH} characters to search for movies.
            </p>
          </div>
        )}
      </Combobox>
    </Modal>
  );
};
