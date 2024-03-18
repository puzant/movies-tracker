import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { IMovieList } from "@/interfaces";

export const MoviesList = ({ movies }: { movies: IMovieList[] }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-col gap-4 mt-4">
        {!movies?.length ? (
          <p className="text-xl">{t("no_movies")}</p>
        ) : (
          movies.map((movie: IMovieList) => (
            <Link to={`/movie/${movie.id}`} className="flex gap-2 border-2 rounded-md shadow-lg">
              <img
                className="rounded-l-md"
                src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
              />

              <div className="flex flex-col gap-2 p-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-xl">{movie.original_title}</span>

                  <span className="text-gray-500">
                    {DateTime.fromISO(movie.release_date).toLocaleString({
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <span>{movie.overview}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
