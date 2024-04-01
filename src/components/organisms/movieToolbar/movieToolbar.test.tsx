import { fireEvent, render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieToolbar } from "./movieToolbar";
import useMovieToolbar from "@/hooks/useMovieToolbar";

const render = (ui: any, options?: any) => {
  const queryClient = new QueryClient();
  return rtlRender(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, options);
};

const mockHandleSetMovieToFavorite = vi.fn();
const mockHandleSetMovieToWatchList = vi.fn();
const mockHandleMovieRating = vi.fn();
const mockOnRateMovie = vi.fn();

vi.mock("@/hooks/useMovieToolbar", () => ({
  default: vi.fn(() => ({
    favoriteTooltip: "add_movie_to_favorite",
    watchListTooltip: "add_movie_to_watch_list",
    rateMovieTooltip: "rate_movie",
    isAuthenticated: true,
    t: (key: string) => key,
    handleSetMovieToFavorite: mockHandleSetMovieToFavorite,
    handleSetMovieToWatchList: mockHandleSetMovieToWatchList,
    handleMovieRating: mockHandleMovieRating,
    onRateMovie: mockOnRateMovie,
  })),
}));

describe("MovieToolbar Component", () => {
  describe("Rendering", () => {
    it("should show correct tooltip if user authenticated", () => {
      const { getByLabelText } = render(<MovieToolbar movieId={123} />);

      expect(getByLabelText("add_movie_to_favorite")).toBeInTheDocument();
      expect(getByLabelText("add_movie_to_watch_list")).toBeInTheDocument();
      expect(getByLabelText("rate_movie")).toBeInTheDocument();
    });
  });

  describe("Toolbar buttons functionalities", () => {
    it("calls handleSetMovieToFavorite on click", () => {
      const { handleSetMovieToFavorite } = useMovieToolbar(123);
      const { getByLabelText } = render(<MovieToolbar movieId={123} />);
      const addToFavoriteButton = getByLabelText("add_movie_to_favorite");

      fireEvent.click(addToFavoriteButton);
      expect(handleSetMovieToFavorite).toHaveBeenCalledOnce();
    });

    it("calls handleSetMovieToWatchList on click", () => {
      const { handleSetMovieToWatchList } = useMovieToolbar(123);
      const { getByLabelText } = render(<MovieToolbar movieId={123} />);
      const addToWatchListButton = getByLabelText("add_movie_to_watch_list");

      fireEvent.click(addToWatchListButton);
      expect(handleSetMovieToWatchList).toHaveBeenCalledOnce();
    });

    it("calls mockOnRateMovie on click", () => {
      const { onRateMovie } = useMovieToolbar(123);
      const { getByLabelText } = render(<MovieToolbar movieId={123} />);
      const rateMovieButton = getByLabelText("rate_movie");

      fireEvent.click(rateMovieButton);
      expect(onRateMovie).toHaveBeenCalledOnce();
    });
  });
});
