import { vi } from "vitest";
import { render as rtlRender, fireEvent, renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import { Filters } from "./filters";
import useFilters from "@/hooks/useFilters";
import { sortingOptions } from "@/utils/constants";

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
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Drama" },
    ],
    t: (key: string) => key,
    setGenres: vi.fn(),
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
  test("it should render filters component", () => {
    const { getByText } = render(<Filters />);
    expect(getByText("sort_by")).toBeInTheDocument();
  });

  // test("it should show loading spineer when isFetching is true", () => {
  //   const { getByText } = render(<Filters />);
  //   expect(getByText("Loading...")).toBeInTheDocument();
  // });

  test("should display a list of genres", () => {
    const { getByText } = render(<Filters />);
    expect(getByText("Action")).toBeInTheDocument();
    expect(getByText("Drama")).toBeInTheDocument();
  });

  test("should call the setGenre method with correct paramter", () => {
    const { getByText } = render(<Filters />);

    fireEvent.click(getByText("Action"));
    expect(useFilters().setGenres).toHaveBeenCalledWith({ id: 1, name: "Action" });
  });
});
