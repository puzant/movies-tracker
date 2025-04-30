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
      <figure className="border shadow-md rounded-md w-[90%] md:w-[50%] p-2 md:p-5 flex flex-col md:flex-row gap-4 items-center justify-between m-auto my-6 md:my-0">
        <img className="w-[80px] h-[40px] md:w-[110px] md:h-[52px]" src={tmdbLogo} alt="tmdb logo" />
        <figcaption className="text-sm text-gray-500 text-center">{t("tmdb_notice")}</figcaption>
      </figure>

      <header className="px-4 sm:px-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t("popular_movies")}</h2>
        <button className="block md:hidden" onClick={() => setOpenDialog(true)}>
          <FilterListIcon />
        </button>
      </header>

      <main className="flex gap-6 px-4 sm:px-8 py-4">
        <aside className="w-[30%] lg:w-[20%] hidden sm:block">
          <Filters />
        </aside>

        {error ? (
          <ErrorMessage />
        ) : (
          <section className="w-full md:w-[70%] lg:w-[80%]">
            {status === "pending" ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {moviesData?.pages.every((p: IPage) => p.results.length === 0) ? (
                  <p className="text-3xl text-center">{t("no_results")}</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
                    {moviesData?.pages.map((page: IPage) =>
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
          </section>
        )}
      </main>

      <FiltersDialog onClose={() => setOpenDialog(false)} openDialog={openDialog} />
    </div>
  );
};

export default Home;
