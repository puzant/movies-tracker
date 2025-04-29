import { MemoryRouter } from "react-router-dom";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { render as rtlRender, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Home from "./home";

const mockApiFunc = vi.fn();

const mockApiFunctions = {
  getAccountDetails: { func: mockApiFunc, key: "movieDetails" },
  getMovies: { func: mockApiFunc, key: "movies" },
};

const render = (ui: any, options?: any) => {
  const queryClient = new QueryClient();

  return rtlRender(
    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home apiFunctions={mockApiFunctions} />
        </MemoryRouter>
      </QueryClientProvider>
    </LocalizationProvider>,
    options
  );
};

describe("Home Component", () => {
  it("renders popular movies", () => {
    const { getByText } = render(<Home apiFunctions={mockApiFunctions} />);
    screen.debug();
    expect(getByText("tmdb_notice")).toBeInTheDocument();
  });
});
