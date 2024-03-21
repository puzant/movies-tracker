import { vi } from "vitest";
import { render as rtlRender } from "@testing-library/react";
import { Filters } from "./filters";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

const render = (ui: any, options?: any) => {
  const queryClient = new QueryClient();

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
        {ui}
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

describe("Filters Component", () => {
  test("it should render filters component", () => {
    const { getByText } = render(<Filters />);
    expect(getByText("sort_by")).toBeInTheDocument();
  });

  test("it should show loading indicator", () => {
    const { getByTestId } = render(<Filters />);
    expect(getByTestId("loading-spinner-svg")).toBeInTheDocument();
  });
});
