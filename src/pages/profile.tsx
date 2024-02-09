import React from "react";
import { useTranslation } from "react-i18next";
import { useQueries } from "@tanstack/react-query";

import { IApiFunction } from "@/interfaces";
import useUserStore from "@/store/useUserStore";
import { LoadingSpinner } from "@/components/atoms";
import { PreferencesDialog } from "@/components/organisms";
import { MovieTabs } from "@/components/molecules";

export const Profile = ({ apiFunctions }: { apiFunctions: IApiFunction }) => {
  const { i18n, t } = useTranslation();
  const { username, accountId, sessionId, accentColor } = useUserStore();

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const results: any[] = useQueries({
    queries: [
      {
        queryKey: [
          apiFunctions.getFavoriteMovies.key,
          accountId,
          sessionId,
          i18n.language,
        ],
        queryFn: () =>
          apiFunctions.getFavoriteMovies.func(
            accountId,
            sessionId,
            i18n.language
          ),
      },
      {
        queryKey: [
          apiFunctions.getMoviesInWatchlist.key,
          accountId,
          sessionId,
          i18n.language,
        ],
        queryFn: () =>
          apiFunctions.getMoviesInWatchlist.func(
            accountId,
            sessionId,
            i18n.language
          ),
      },
      {
        queryKey: [
          apiFunctions.getRatedMovies.key,
          accountId,
          sessionId,
          i18n.language,
        ],
        queryFn: () =>
          apiFunctions.getRatedMovies.func(accountId, sessionId, i18n.language),
      },
    ],
  });

  const anyLoading = results.some((result) => result.status === "pending");

  const [favoriteMovies, moviesInWatchlist, ratedMovies] = results.map(
    (query) => query.data
  );

  return (
    <>
      <div>
        <div className="profile-background p-[20px] md:p-[40px]">
          <div className="flex gap-4 items-center">
            <div
              style={{ background: accentColor }}
              className="cursor-pointer flex items-center justify-center text-4xl rounded-full text-white w-[80px] h-[80px] p-4"
            >
              {username.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div className="text-white text-xl font-bold">{username}</div>
              <div
                className="text-white underline cursor-pointer"
                onClick={() => setOpenDialog(true)}
              >
                {t("edit_preferences")}
              </div>
            </div>
          </div>
        </div>

        {anyLoading ? (
          <div className="flex justify-center mt-12">
            <LoadingSpinner />
          </div>
        ) : (
          <MovieTabs
            favoriteMovies={favoriteMovies?.data.results}
            moviesInWatchlist={moviesInWatchlist?.data.results}
            ratedMovies={ratedMovies?.data.results}
          />
        )}

        <PreferencesDialog
          openDialog={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      </div>
    </>
  );
};
