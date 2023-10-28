import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import useStore from "@/store";
import { sortingOptions } from "@/utils/constants";
import { getMovies, getAccountDetails } from "@/api";
import { IMovie, IGenre, ISortingOption } from "@/interfaces";
import { Filters, Movie, LoadingSpinner } from "@/components";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ErrorIcon from "@mui/icons-material/Error";

export const Home = () => {
  const { isAuthenticated, sessionId } = useStore();

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = React.useState<ISortingOption>(
    sortingOptions[0]
  );
  const [selectedGenres, setSelectedGenres] = React.useState<IGenre[]>([]);

  const { data: accountData } = useQuery({
    queryKey: ["userAccount", sessionId],
    queryFn: () => getAccountDetails(sessionId),
    enabled: isAuthenticated,
  });

  const {
    data: moviesData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["movies", selectedOption, selectedGenres, startDate, endDate],
    queryFn: ({ pageParam }) =>
      getMovies(selectedOption, selectedGenres, startDate, endDate, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.page < lastPage.data.total_pages) {
        return lastPage.data.page + 1;
      }
      return undefined;
    },
  });

  React.useEffect(() => {
    if (accountData) useStore.setState({ accountId: accountData.data.id });
  }, [accountData]);

  const handleGenreSelection = (genre: IGenre): void => {
    if (selectedGenres.includes(genre))
      setSelectedGenres(
        selectedGenres.filter((selectedGenre) => selectedGenre.id !== genre.id)
      );
    else setSelectedGenres([...selectedGenres, genre]);
  };

  return (
    <div className="mt-8">
      <div className="px-4 sm:px-8">
        <span className="text-2xl font-semibold">Popular Movies</span>
      </div>

      <div className="flex gap-6 px-4 sm:px-8 py-4">
        <Filters
          selectedGenres={selectedGenres}
          selectedOption={selectedOption}
          onSortSelection={(e: Event) => setSelectedOption(e)}
          onGenreSelection={handleGenreSelection}
        >
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 2,
              },
            }}
          />

          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 2,
              },
            }}
          />
        </Filters>

        {error ? (
          <div className="flex flex-col items-center w-4/5 text-3xl">
            <ErrorIcon sx={{ fontSize: 50, color: "#ff0000" }} />
            <span>There was an error</span>
          </div>
        ) : (
          <div className="w-full md:w-4/5">
            {status === "pending" ? (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
                {moviesData &&
                  moviesData.pages.map(
                    (page: { data: { results: IMovie[] } }) =>
                      page.data.results.map((movie: IMovie) => (
                        <Link key={movie.id} to={`/movie/${movie.id}`}>
                          <Movie movie={movie} />
                        </Link>
                      ))
                  )}
              </div>
            )}

            <div className="flex justify-center">
              {status === "success" && (
                <button
                  className="bg-[#172554] px-4 py-2 rounded-md text-white mt-4"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
