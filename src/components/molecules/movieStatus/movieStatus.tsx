import { useTranslation } from "react-i18next";
import { IMovie, IKeyword } from "@/interfaces";
import { getMovieLanguage } from "@/utils";

export const MovieStatus = ({ movieDetails }: { movieDetails: IMovie }) => {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex flex-col gap-2 w-[20%] md:w-[30%]">
      <div className="flex gap-1">
        <span className="font-bold">{t("status")}: </span>
        <span>{movieDetails.status}</span>
      </div>

      <div className="flex gap-1">
        <span className="font-bold">{t("original_language")}: </span>
        <span>{getMovieLanguage(movieDetails.original_language)}</span>
      </div>

      <div className="flex gap-1 ">
        <span className="font-bold">{t("budget")}: </span>
        <span>${movieDetails.budget?.toLocaleString()}</span>
      </div>

      <div className="flex gap-1 ">
        <span className="font-bold">{t("revenue")}: </span>
        <span>${movieDetails.revenue?.toLocaleString()}</span>
      </div>

      <div className="mt-2 block  bg-gray-300 w-full h-[1px]"></div>

      <span className="font-bold">{t("keywords")}: </span>
      <div className="flex gap-2 flex-wrap">
        {movieDetails.keywords?.keywords.map((k: IKeyword) => (
          <span className="text-xs rounded-sm cursor-pointer bg-gray-200 p-2" key={k.id}>
            {k.name}
          </span>
        ))}
      </div>
    </div>
  );
};
