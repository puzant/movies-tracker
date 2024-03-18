import { Link, useLocation } from "react-router-dom";

import useInfiniteMovieQuery from "@/hooks/usePaginatedQuery";
import { IMovie, IApiFunction, IPage } from "@/interfaces";
import { LoadingSpinner, ErrorMessage } from "@/components/atoms";
import { Movie } from "@/components/molecules";

export const SearchResults = ({ apiFunctions }: { apiFunctions: IApiFunction }) => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  const {
    data: searchResults,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteMovieQuery(
    [apiFunctions.searchMovies.key, searchQuery],
    ({ pageParam }: { pageParam: number }) => apiFunctions.searchMovies.func(searchQuery, pageParam)
  );

  return (
    <div className="px-4 sm:px-8 py-4">
      {error ? (
        <ErrorMessage />
      ) : (
        <div className="w-full md:w-4/5 m-auto">
          {status === "pending" ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {searchResults.pages.every((p: IPage) => p.results.length === 0) ? (
                <div className="text-3xl text-center">No More Results</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
                  {searchResults.pages.map((page: IPage) =>
                    page.results.map((movie: IMovie) => (
                      <Link key={movie.id} to={`/movie/${movie.id}`}>
                        <Movie movie={movie} />
                      </Link>
                    ))
                  )}
                </div>
              )}
            </>
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
  );
};
