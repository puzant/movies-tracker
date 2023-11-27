import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useUserStore from "@/store/useUserStore";
import useFiltersStore from "@/store/useFiltersStore";
import useInfiniteMovieQuery from "@/hooks/usePaginatedQuery";
import { IMovie, IApiFunction } from "@/interfaces";

import { Filters, Movie, LoadingSpinner } from "@/components";
import ErrorIcon from "@mui/icons-material/Error";

export const Home = ({ apiFunctions }: IApiFunction) => {
  const { sortBy, releaseDate, selectedGenres } = useFiltersStore();
  const { isAuthenticated, sessionId } = useUserStore();

  const { data: accountData } = useQuery({
    queryKey: [apiFunctions.getAccountDetails.key, sessionId],
    queryFn: () => apiFunctions.getAccountDetails.func(sessionId),
    enabled: isAuthenticated,
  });

  const {
    data: moviesData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteMovieQuery(
    [
      apiFunctions.getMovies.key,
      sortBy,
      selectedGenres,
      releaseDate.start,
      releaseDate.end,
    ],
    ({ pageParam }) =>
      apiFunctions.getMovies.func(
        sortBy,
        selectedGenres,
        releaseDate.start,
        releaseDate.end,
        pageParam
      )
  );

  React.useEffect(() => {
    if (accountData) useUserStore.setState({ accountId: accountData.data.id });
  }, [accountData]);

  return (
    <div className="mt-8">
      <div className="px-4 sm:px-8 flex justify-between">
        <span className="text-2xl font-semibold">Popular Movies</span>
      </div>

      <div className="flex gap-6 px-4 sm:px-8 py-4">
        <div className="w-[30%] lg:w-[20%] hidden sm:block">
          <Filters />
        </div>

        {error ? (
          <div className="flex flex-col items-center w-4/5 text-3xl">
            <ErrorIcon sx={{ fontSize: 50, color: "#ff0000" }} />
            <span>There was an error</span>
          </div>
        ) : (
          <div className="w-full md:w-[70%] lg:w-[80%]">
            {status === "pending" ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
                {moviesData &&
                  moviesData.pages.map(
                    (page: { data: { results: IMovie[] } }) =>
                      page.data.results.map((movie: IMovie) => (
                        <Link key={movie.id} to={`/movie/${movie.id}`}>
                          <Movie movie={movie} />
                        </Link>
                      ))
                  )}
              </div>
            )}

            <div className="flex justify-center">
              {status === "success" && (
                <button
                  className="bg-[#172554] px-4 py-2 rounded-md text-white mt-4"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
