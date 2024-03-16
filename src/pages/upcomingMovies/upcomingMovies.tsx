import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useInfiniteMovieQuery from "@/hooks/usePaginatedQuery";
import { IApiFunction, IMovie } from "@/interfaces";
import { LoadingSpinner, ErrorMessage } from "@/components/atoms";
import { Movie } from "@/components/molecules";

export const UpcomingMovies = ({
  apiFunctions,
}: {
  apiFunctions: IApiFunction;
}) => {
  const { i18n, t } = useTranslation();

  const {
    data: upcomingMovies,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteMovieQuery(
    [apiFunctions.getUpcomingMovies.key, i18n.language],
    ({ pageParam }: { pageParam: number }) =>
      apiFunctions.getUpcomingMovies.func(i18n.language, pageParam)
  );

  return (
    <div className="mt-8">
      <div className="px-4 sm:px-8">
        <span className="text-2xl font-semibold">{t("upcoming_movies")}</span>
      </div>

      {error ? (
        <ErrorMessage />
      ) : (
        <div className="w-full sm:w-[80%] px-4 sm:px-8 py-4 m-auto">
          {status === "pending" ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
              {upcomingMovies &&
                upcomingMovies.pages.map((page: any) =>
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
                  ? t("loading_more")
                  : hasNextPage
                  ? t("load_more")
                  : t("nothing_to_load")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
