import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

import useFilters from "@/hooks/useFilters";
import { IGenre, ISortingOption } from "@/interfaces";
import { sortingOptions } from "@/utils/constants";
import { Divider, LoadingSpinner } from "@/components/atoms";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const Filters = () => {
  const {
    genres,
    isFetching,
    t,
    accentColor,
    sortBy,
    releaseDate,
    selectedGenres,
    setSort,
    setStartDate,
    setEndDate,
    setGenres,
  } = useFilters();

  return (
    <div className="flex flex-col gap-4">
      <div className="border shadow-md p-4 rounded-md">
        <span className="font-semibold">{t("sort")}</span>

        <Divider />

        <div className="flex gap-2 flex-col">
          <span>{t("sort_by")}</span>

          <Listbox value={sortBy} onChange={setSort}>
            <Listbox.Button className="bg-[#e4e7eb] px-4 py-2 rounded-md font-normal w-full text-left flex justify-between">
              <span>{t(`sorting_options.${sortBy.key}`)}</span>
              <ExpandMoreIcon />
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="border rounded-md shadow-sm mt-1">
                {sortingOptions.map((option: ISortingOption) => (
                  <Listbox.Option
                    key={option.id}
                    value={option}
                    className="relative cursor-default p-1.5 ui-not-active:bg-white ui-active:bg-[#e4e7eb]"
                  >
                    <span className="cursor-pointer">{t(`sorting_options.${option.key}`)}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>

      <div className="border shadow-md p-4 rounded-md">
        <span className="font-semibold">{t("filters")}</span>

        <Divider />

        <span>{t("release_date")}</span>

        <div className="flex flex-col gap-4 mt-2">
          <DatePicker
            label={t("start_date")}
            value={releaseDate.start}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 2,
              },
            }}
          />

          <DatePicker
            label={t("end_date")}
            value={releaseDate.end}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 2,
              },
            }}
          />
        </div>

        <Divider />

        <span>{t("genres")}</span>

        <div className="flex flex-wrap gap-3 mt-2">
          {isFetching ? (
            <div className="m-auto">
              <LoadingSpinner />
            </div>
          ) : (
            genres.map((genre: IGenre) => (
              <div
                onClick={() => setGenres(genre)}
                style={{
                  background: selectedGenres.includes(genre) ? `${accentColor}` : "transparent",
                }}
                className={`${
                  selectedGenres.includes(genre) && "border border-transparent text-white"
                } rounded-2xl text-xs border border-gray-400 p-2.5 cursor-pointer ease-in duration-300`}
                key={genre.id}
              >
                {genre.name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
