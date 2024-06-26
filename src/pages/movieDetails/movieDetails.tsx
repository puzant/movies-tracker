import { Link } from "react-router-dom";

import { getMovieLanguage } from "@/utils";
import { IReview, ICast, IGenre, IKeyword, IApiFunction, IRecommededMovie } from "@/interfaces";
import useMovieDetails from "@/hooks/useMovieDetails";

import { Divider, LoadingSpinner, ErrorMessage } from "@/components/atoms";
import { Actor, Review, Movie, MovieRating, MovieStatus } from "@/components/molecules";
import { MovieToolbar } from "@/components/organisms";

export const MovieDetails = ({ apiFunctions }: { apiFunctions: IApiFunction }) => {
  const { t, movieId, posterBackDropColors, movieDetails, isLoading, error } =
    useMovieDetails(apiFunctions);

  const {
    backdrop_path,
    poster_path,
    original_title,
    tagline,
    vote_average,
    genres,
    release_date,
    status,
    overview,
    credits,
    original_language,
    budget,
    revenue,
    keywords,
    reviews,
    recommendations,
  } = movieDetails || {};

  const { red, blue, green } = posterBackDropColors[0] || {};

  return (
    <>
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <div className="flex items-center justify-center mt-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <div
            style={{
              boxShadow: `inset 0 0 0 100vw rgba(0,0,0, 70%)`,
              backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              position: "relative",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center m-auto gap-9 py-8 w-full md:w-[90%] lg:w-[85%]">
              <img
                className="rounded-md w-[220px] h-full md:w-[300px] md:h-[450px]"
                src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
              />

              <div className="text-center sm:text-left">
                <div className="text-4xl text-white">{original_title}</div>
                <div className="antialiased italic text-white mt-2 mb-2">{tagline}</div>

                <MovieRating vote={vote_average!} />

                <div className="flex flex-col gap-2.5 mt-2 items-center sm:items-start p-1.5 md:p-0">
                  <div className="flex flex-col md:flex-row gap-2">
                    <span className="text-white font-bold">{t("genres")}:</span>
                    <div className="antialiased text-white">
                      {(genres ?? []).map((genre: IGenre) => genre.name).join(", ")}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="font-bold text-white">{t("release_date")}:</div>
                    <div className="antialiased text-white">{release_date}</div>
                  </div>

                  <div className="flex gap-2">
                    <div className="font-bold text-white">{t("status")}:</div>
                    <div className="antialiased text-white">{status}</div>
                  </div>

                  <div className="flex flex-col">
                    <div className="font-bold text-white">{t("overview")}:</div>
                    <div className="antialiased leading-7 w-full sm:w-[90%] text-white mt-1 p-2.5 sm:p-0">
                      {overview}
                    </div>
                  </div>
                </div>

                <MovieToolbar movieId={movieDetails?.id!} />
              </div>
            </div>
          </div>

          <div className="text-2xl px-4 md:px-10 md:px-20 lg:px-20 mt-8 font-semibold">
            {t("top_cast")}
          </div>

          <div className="mt-2 flex justify-between gap-8 px-4 md:px-10 lg:px-20">
            <div className="flex flex-col w-full md:w-[70%] lg:w-[80%]">
              <div className="overflow-x-auto h-fit p-2">
                <div className="min-w-max flex gap-3">
                  {credits?.cast.slice(0, 9).map((c: ICast) => (
                    <Actor key={c.id} actor={c} />
                  ))}
                </div>
              </div>

              <div className="flex md:hidden flex-col gap-2 mt-4 px-4">
                <div className="flex gap-2">
                  <span className="font-bold">{t("original_language")}: </span>
                  <span>{getMovieLanguage(original_language)}</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold">{t("budget")}: </span>
                  <span>${budget?.toLocaleString()}</span>
                </div>

                <div className="flex gap-2">
                  <span className="font-bold">{t("revenue")}: </span>
                  <span>${revenue?.toLocaleString()}</span>
                </div>

                <span className="font-bold">{t("keywords")}: </span>
                <div className="flex gap-2 flex-wrap">
                  {keywords?.keywords.map((k: IKeyword) => (
                    <span className="text-xs rounded-sm cursor-pointer bg-gray-200 p-2" key={k.id}>
                      {k.name}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                className="text-md font-semibold hover:text-gray-500 cursor-pointer mt-8"
                to={`/movie/${movieId}/cast`}
                state={{
                  movieDetails: movieDetails,
                  colorExtract: { red, green, blue },
                }}
              >
                {t("full_cast")}
              </Link>

              <Divider />

              <div className="text-2xl mt-6 font-semibold mb-2">
                {t("reviews")} ({reviews?.results.length})
              </div>

              {reviews?.results.slice(0, 1).map((review: IReview) => (
                <Review review={review} />
              ))}

              <Link
                to={`/movie/${movieId}/reviews`}
                state={{
                  movieDetails: movieDetails,
                  colorExtract: { red, green, blue },
                }}
                className="text-md font-semibold hover:text-gray-500 cursor-pointer mt-8"
              >
                {t("all_reviews")}
              </Link>

              <Divider />

              <div className="text-2xl mt-5 font-semibold">{t("recommendations")}</div>

              {recommendations?.results.length ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 mt-4">
                  {recommendations.results.slice(0, 10).map((movie: IRecommededMovie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`}>
                      <Movie movie={movie} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-xl py-2">{t("no_recommendations")} </div>
              )}
            </div>

            <MovieStatus movieDetails={movieDetails!} />
          </div>
        </div>
      )}
    </>
  );
};
