import { useTranslation } from "react-i18next";
import { Tab } from "@headlessui/react";
import { MovieList } from "@/components";

interface MovieTabsProps {
  favoriteMovies: any;
  moviesInWatchlist: any;
  ratedMovies: any;
}

export const MovieTabs = ({
  favoriteMovies,
  moviesInWatchlist,
  ratedMovies,
}: MovieTabsProps) => {
  const { t } = useTranslation();

  return (
    <Tab.Group>
      <Tab.List className="border-2 flex justify-center gap-8">
        {[t("favorites"), t("watchlist"), t("rated_movies")].map((t) => (
          <Tab
            className={`ui-selected:border-b-4 ui-selected:border-[#172554] text-md md:text-xl p-2`}
          >
            {t}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="px-4 md:px-8">
        <Tab.Panel>
          <MovieList t={t} movies={favoriteMovies} />
        </Tab.Panel>
        <Tab.Panel>
          <MovieList t={t} movies={moviesInWatchlist} />
        </Tab.Panel>
        <Tab.Panel>
          <MovieList t={t} movies={ratedMovies} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
