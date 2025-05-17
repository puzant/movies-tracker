import { useState } from "react";
import { DateTime } from "luxon";
import { IMovie } from "@/interfaces";
import { MovieRating } from "@/components/molecules";
import moviePlacegolder from "@/assets/poster-placeholder.svg";

export const Movie = ({ movie }: { movie: IMovie }) => {
  const MoviePoster = () => {
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleOnLoad = () => {
      setHasLoaded(true);
    };

    if (movie.poster_path)
      return (
        <div className="relative">
          {!hasLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>}

          <img
            src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            alt={movie.title}
            onLoad={handleOnLoad}
            className={`w-full h-full rounded-t-xl object-cover ${
              hasLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          />
        </div>
      );

    return <img src={moviePlacegolder} alt="Movie Poster Placeholder" className="bg-[#dbdbdb] rounded-t-xl" />;
  };

  return (
    <div className="h-full border rounded-xl flex flex-col shadow-md cursor-pointer">
      <MoviePoster />

      <div className="p-3 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-[1px]">
          <span className="font-bold">{movie.title}</span>
          <span className="text-gray-500">
            {DateTime.fromISO(movie.release_date).toLocaleString({
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
        <MovieRating vote={movie.vote_average} />
      </div>
    </div>
  );
};
