import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useInfiniteMovieQuery from "@/queries/useInfiniteMovieQuery";
import { IApiFunction, IMovie, IPage } from "@/interfaces";

import { LoadingSpinner, ErrorMessage } from "@/components/atoms";
import { Movie } from "@/components/molecules";

const UpcomingMovies = ({ apiFunctions }: { apiFunctions: IApiFunction }) => {
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
    ({ pageParam }: { pageParam: number }) => apiFunctions.getUpcomingMovies.func(i18n.language, pageParam)
  );

  return (
    <div className="mt-8">
      <header className="px-4 sm:px-8">
        <h1 className="text-2xl font-semibold">{t("upcoming_movies")}</h1>
      </header>

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
              {upcomingMovies.pages.map((page: IPage) =>
                page.results.map((movie: IMovie) => (
                  <article key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                      <Movie movie={movie} />
                    </Link>
                  </article>
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
                {isFetchingNextPage ? t("loading_more") : hasNextPage ? t("load_more") : t("nothing_to_load")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMovies;
