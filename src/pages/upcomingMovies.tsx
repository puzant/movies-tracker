import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getUpcomingMovies } from "@/api";
import { IMovie } from "@/interfaces";
import { Movie, LoadingSpinner } from "@/components";

import ErrorIcon from "@mui/icons-material/Error";

export const UpcomingMovies = () => {
  const {
    data: upcomingMovies,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["upcomingMovies"],
    queryFn: ({ pageParam }) => getUpcomingMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.total_pages) {
        return lastPage.data.page + 1;
      }
      return undefined;
    },
  });

  return (
    <div>
      {error ? (
        <div className="mt-10 flex flex-col items-center justify-center w-full text-3xl">
          <ErrorIcon sx={{ fontSize: 50, color: "#ff0000" }} />
          <span>There was an error</span>
        </div>
      ) : (
        <div className="w-full sm:w-[80%] px-4 sm:px-8 py-4 m-auto">
          {status === "pending" ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
              {upcomingMovies &&
                upcomingMovies.pages.map(
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
  );
};
