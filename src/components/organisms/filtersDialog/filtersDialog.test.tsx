import { fireEvent, render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import { FiltersDialog } from "./filtersDialog";

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

describe("Filters dialog", () => {
  it("renders filters dialog", () => {
    const mockOnClose = vi.fn();
    const { getByText } = render(<FiltersDialog openDialog onClose={mockOnClose} />);
    expect(getByText("sorting_and_filters")).toBeInTheDocument();
  });

  it("calls onClose function when clicking on apply button", () => {
    const mockOnClose = vi.fn();
    const { getByText } = render(<FiltersDialog openDialog onClose={mockOnClose} />);
    const applyButton = getByText("apply");
    fireEvent.click(applyButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
