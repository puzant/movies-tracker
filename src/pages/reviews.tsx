import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { IReview } from "@/interfaces";
import { Review } from "@/components";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Reviews = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { movieDetails, colorExtract } = state || {};
  const { red, green, blue } = colorExtract || {};

  const formattedReleaseDate = DateTime.fromISO(movieDetails.release_date);

  return (
    <div className="pb-4">
      <div
        style={{
          boxShadow: `inset 0 0 0 100vw rgba(0,0,0, 70%)`,
          backgroundColor: `rgba(${red}, ${green}, ${blue}, 80%)`,
        }}
        className="px-4 md:px-14 py-4 w-full"
      >
        <div className="flex gap-4">
          <img
            className="rounded-md"
            src={`https://image.tmdb.org/t/p/w58_and_h87_face/${movieDetails.poster_path}`}
          />

          <div>
            <div className="flex  gap-2 items-center">
              <span className="text-white hover:text-gray-300 cursor-pointer text-xl md:text-4xl">
                {movieDetails.original_title}
              </span>
              <span className="text-white text-[20px] md:text-[30px] font-normal">
                ({formattedReleaseDate.year})
              </span>
            </div>
            <span className="pt-1 text-gray-300 hover:text-gray-100 font-semibold">
              <ArrowBackIcon />
              <Link to={`/movie/${movieDetails.id}`}>{t("back_to_main")}</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 m-auto w-full md:w-[80%] px-4 md:px-14 mt-8">
        {movieDetails.reviews.results.map((r: IReview) => (
          <Review review={r} />
        ))}
      </div>
    </div>
  );
};
