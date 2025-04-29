import { Link } from "react-router-dom";
import useHome from "@/hooks/useHome";
import { IApiFunction, IMovie, IPage } from "@/interfaces";

import { Button, LoadingSpinner, ErrorMessage } from "@/components/atoms";
import { Movie } from "@/components/molecules";
import { Filters, FiltersDialog } from "@/components/organisms";

import FilterListIcon from "@mui/icons-material/FilterList";
import tmdbLogo from "@/assets/tmdbLogo.svg";

const Home = ({ apiFunctions }: { apiFunctions: IApiFunction }) => {
  const {
    t,
    accentColor,
    openDialog,
    setOpenDialog,
    moviesData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useHome(apiFunctions);

  return (
    <div className="mt-8">
      <div className="border shadow-md rounded-md w-[90%] md:w-[50%] p-2 md:p-5 flex flex-col md:flex-row gap-4 items-center justify-between m-auto my-6 md:my-0">
        <img className="w-[80px] h-[40px] md:w-[110px] md:h-[52px]" src={tmdbLogo} alt="tmdb logo" />
        <div className="text-sm text-gray-500 text-center">{t("tmdb_notice")}</div>
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
          <ErrorMessage />
        ) : (
          <div className="w-full md:w-[70%] lg:w-[80%]">
            {status === "pending" ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {moviesData?.pages.every((p: IPage) => p.results.length === 0) ? (
                  <div className="text-3xl text-center">{t("no_results")}</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
                    {moviesData?.pages.map((page: IPage) =>
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
                <Button
                  style={{ background: accentColor }}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage ? t("loading_more") : hasNextPage ? t("load_more") : t("nothing_to_load")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <FiltersDialog onClose={() => setOpenDialog(false)} openDialog={openDialog} />
    </div>
  );
};

export default Home;
