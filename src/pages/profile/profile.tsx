import useProfile from "@/hooks/useProfile";
import { IApiFunction } from "@/interfaces";

import { LoadingSpinner } from "@/components/atoms";
import { PreferencesDialog } from "@/components/organisms";
import { MovieTabs } from "@/components/molecules";

export const Profile = ({ apiFunctions }: { apiFunctions: IApiFunction }) => {
  const {
    t,
    username,
    accentColor,
    openDialog,
    setOpenDialog,
    anyLoading,
    favoriteMovies,
    moviesInWatchlist,
    ratedMovies,
  } = useProfile(apiFunctions);

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
            favoriteMovies={favoriteMovies?.results}
            moviesInWatchlist={moviesInWatchlist?.results}
            ratedMovies={ratedMovies?.results}
          />
        )}

        <PreferencesDialog openDialog={openDialog} onClose={() => setOpenDialog(false)} />
      </div>
    </>
  );
};
