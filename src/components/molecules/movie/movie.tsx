import { DateTime } from "luxon";
import { IMovie } from "@/interfaces";
import { MovieRating } from "@/components/molecules";
import moviePlacegolder from "@/assets/poster-placeholder.svg";

export const Movie = ({ movie }: { movie: IMovie }) => {
  const getMoviePoster = () => {
    if (movie.poster_path)
      return (
        <img
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          alt={movie.title}
          className="bg-[#dbdbdb] rounded-t-xl"
        />
      );

    return <img src={moviePlacegolder} alt="Movie Poster Placeholder" className="bg-[#dbdbdb] rounded-t-xl" />;
  };

  return (
    <div className="h-full border rounded-xl flex flex-col shadow-md cursor-pointer">
      {getMoviePoster()}

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
