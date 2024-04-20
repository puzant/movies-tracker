import { render as rtlRender, fireEvent, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import { Filters } from "./filters";
import useFilters from "@/hooks/useFilters";
import { sortingOptions } from "@/utils/constants";

const mockSetGenres = vi.fn();
const mockSortBy = vi.fn();

vi.mock("@/hooks/useFilters", () => ({
  default: vi.fn(() => ({
    accentColor: "#0177d2",
    isFetching: false,
    sortBy: sortingOptions[0],
    releaseDate: {
      start: null,
      end: null,
    },
    selectedGenres: [],
    genres: {
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Drama" },
      ],
    },
    t: (key: string) => key,
    setSort: mockSortBy,
    setGenres: mockSetGenres,
  })),
}));

const queryClient = new QueryClient();

const render = (ui: any, options?: any) => {
  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
        {ui}
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

afterEach(() => {
  vi.restoreAllMocks();
  queryClient.clear();
});

describe("Filters Component", () => {
  describe("Rendering", () => {
    it("renders sorting component", () => {
      const { getByText } = render(<Filters />);

      expect(getByText("sort_by")).toBeInTheDocument();
      expect(getByText("filters")).toBeInTheDocument();
      expect(getByText("genres")).toBeInTheDocument();
      screen.debug();
    });

    it("renders sorting by menu correctly", () => {
      const { getByText } = render(<Filters />);
      expect(getByText("sorting_options.popularity.desc")).toBeInTheDocument();
    });

    it("renders date picker component correctly", () => {
      const { getAllByLabelText } = render(<Filters />);
      const buttonElements = getAllByLabelText("Choose date");

      expect(buttonElements.length).toEqual(2);
    });

    it("render a list of genres", () => {
      const { getByText } = render(<Filters />);

      expect(getByText("Action")).toBeInTheDocument();
      expect(getByText("Drama")).toBeInTheDocument();
    });
  });

  describe("Sorting functionlity", () => {
    it("open sorting menu and selects sort by", () => {
      const { setSort } = useFilters();
      const { getByText } = render(<Filters />);
      const sortingMenuButton = getByText("sorting_options.popularity.desc");

      fireEvent.click(sortingMenuButton);
      const sortingOptionAsc = getByText("sorting_options.popularity.asc");
      fireEvent.click(sortingOptionAsc);
      expect(setSort).toHaveBeenCalledWith({
        id: 2,
        key: "popularity.asc",
        name: "Popularity Ascending",
      });
    });
  });

  describe("Genres selection functionality", () => {
    it("calls setGenres function when genre is clicked", () => {
      const { setGenres } = useFilters();
      const { getByText } = render(<Filters />);

      const actionGenreButton = getByText("Action");
      fireEvent.click(actionGenreButton);
      expect(setGenres).toHaveBeenCalledWith({ id: 1, name: "Action" });
    });
  });
});
