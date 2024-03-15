import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import useUserStore from "@/store/useUserStore";
import useFiltersStore from "@/store/useFiltersStore";
import useInfiniteMovieQuery from "@/hooks/usePaginatedQuery";
import { IApiFunction, IMovie, IAccount } from "@/interfaces";

import { Button, LoadingSpinner } from "@/components/atoms";
import { Movie } from "@/components/molecules";
import { Filters, FiltersDialog } from "@/components/organisms";

import ErrorIcon from "@mui/icons-material/Error";
import FilterListIcon from "@mui/icons-material/FilterList";
import tmdbLogo from "@/assets/tmdbLogo.svg";

export const Home = ({ apiFunctions }: { apiFunctions: IApiFunction }) => {
  const { i18n, t } = useTranslation();
  const { sortBy, releaseDate, selectedGenres } = useFiltersStore();
  const { isAuthenticated, sessionId, accentColor } = useUserStore();

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const { data: accountData }: UseQueryResult<IAccount> = useQuery({
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
      i18n.language,
    ],
    ({ pageParam }: { pageParam: number }) =>
      apiFunctions.getMovies.func({
        sortBy: sortBy,
        selectedGenres: selectedGenres,
        startDate: releaseDate.start,
        endDate: releaseDate.end,
        selectedLanguage: i18n.language,
        page: pageParam,
      })
  );

  React.useEffect(() => {
    if (accountData?.data)
      useUserStore.setState({
        accountId: accountData.data.id,
        username: accountData?.data.username,
      });
  }, [accountData]);

  return (
    <div className="mt-8">
      <div className="border shadow-md rounded-md w-[90%] md:w-[50%] p-5 flex flex-col md:flex-row gap-4 items-center justify-between m-auto my-6 md:my-0">
        <img className="w-[110px] h-[52px]" src={tmdbLogo} alt="tmdb logo" />
        <div className="text-center">{t("tmdb_notice")}</div>
      </div>

      <div className="px-4 sm:px-8 flex justify-between items-center">
        <span className="text-2xl font-semibold">{t("popular_movies")}</span>
        <div className="block md:hidden" onClick={() => setOpenDialog(true)}>
          <FilterListIcon />
        </div>
      </div>

      <div className="flex gap-6 px-4 sm:px-8 py-4">
        <div className="w-[30%] lg:w-[20%] hidden sm:block">
          <Filters />
        </div>

        {error ? (
          <div className="flex flex-col items-center w-4/5 text-3xl">
            <ErrorIcon sx={{ fontSize: 50, color: "#ff0000" }} />
            <span>{t("error_text")}</span>
          </div>
        ) : (
          <div className="w-full md:w-[70%] lg:w-[80%]">
            {status === "pending" ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {moviesData.pages.every(
                  (p: any) => p.data.results.length === 0
                ) ? (
                  <div className="text-3xl text-center">{t("no_results")}</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
                    {moviesData.pages.map((page: any) =>
                      page.data.results.map((movie: IMovie) => (
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
                <Button
                  style={{ background: accentColor }}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? t("loading_more")
                    : hasNextPage
                    ? t("load_more")
                    : t("nothing_to_load")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <FiltersDialog
        onClose={() => setOpenDialog(false)}
        openDialog={openDialog}
      />
    </div>
  );
};
