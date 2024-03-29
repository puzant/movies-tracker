import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { ICast, ICrew } from "@/interfaces";

export const FullCastCrew = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { movieDetails, colorExtract } = state || {};

  const { red, green, blue } = colorExtract || {};
  const formattedReleaseDate = DateTime.fromISO(movieDetails.release_date);

  const groupedCrew = movieDetails.credits.crew.reduce((acc: any, member: any) => {
    const { job } = member;
    if (!acc[job]) {
      acc[job] = [];
    }
    acc[job].push(member);
    return acc;
  }, {});

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

      <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-[80%] px-4 md:px-14 mt-8">
        <div>
          <p className="text-2xl">
            {t("cast")} {movieDetails.credits.cast.length}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-4">
            {movieDetails.credits.cast.map((c: ICast) => (
              <div className="flex items-center gap-2">
                <img
                  className="rounded-md w-[66px] h-[66px]"
                  src={`${
                    c.profile_path !== null
                      ? `https://image.tmdb.org/t/p/w66_and_h66_face/${c.profile_path}`
                      : "https://d3uscstcbhvk7k.cloudfront.net/static/images/slider-placeholder-2x.png"
                  }`}
                />
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="pt-1">{c.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-2xl">
            {t("crew")} {movieDetails.credits.crew.length}
          </p>

          <div className="flex flex-col gap-6 mt-2">
            {Object.keys(groupedCrew).map((job) => (
              <div key={job}>
                <p className="font-semibold">{job}</p>

                <div className="h-[1px] bg-gray-200 my-2"></div>

                <div className="flex flex-col gap-4">
                  {groupedCrew[job].map((member: ICrew) => (
                    <div className="flex items-center gap-2">
                      <img
                        className="rounded-md w-[66px] h-[66px]"
                        src={`${
                          member.profile_path !== null
                            ? `https://image.tmdb.org/t/p/w66_and_h66_face/${member.profile_path}`
                            : "https://d3uscstcbhvk7k.cloudfront.net/static/images/slider-placeholder-2x.png"
                        }`}
                      />
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p>{member.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
