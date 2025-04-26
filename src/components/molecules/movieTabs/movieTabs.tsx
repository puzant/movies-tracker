import { useTranslation } from "react-i18next";
import { Tab } from "@headlessui/react";
import { MoviesList } from "@/components/organisms";
import { IMovieList } from "@/interfaces";
import useUserStore from "@/store/useUserStore";

interface MovieTabsProps {
  favoriteMovies: IMovieList[];
  moviesInWatchlist: IMovieList[];
  ratedMovies: IMovieList[];
}

export const MovieTabs = ({ favoriteMovies, moviesInWatchlist, ratedMovies }: MovieTabsProps) => {
  const { t } = useTranslation();
  const { accentColor } = useUserStore();

  const tabKeys = ["Favorites", "Watchlist", "Rated Movies"] as const;

  const mapTranslationKeysToMovieTabs = {
    Favorites: favoriteMovies,
    Watchlist: moviesInWatchlist,
    "Rated Movies": ratedMovies,
  };

  return (
    <Tab.Group>
      <Tab.List className="border-2 flex justify-center gap-8">
        {tabKeys.map((key) => (
          <Tab
            className={`ui-selected:border-b-4 ui-selected:border-[#172554] text-md md:text-xl p-2 flex gap-3 items-center`}
          >
            {t(key.toLowerCase().replace(" ", "_"))}
            <div style={{ background: accentColor }} className="rounded-full px-2 text-white">
              {mapTranslationKeysToMovieTabs[key].length}
            </div>
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="px-4 md:px-8">
        <Tab.Panel>
          <MoviesList movies={favoriteMovies} />
        </Tab.Panel>
        <Tab.Panel>
          <MoviesList movies={moviesInWatchlist} />
        </Tab.Panel>
        <Tab.Panel>
          <MoviesList movies={ratedMovies} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
