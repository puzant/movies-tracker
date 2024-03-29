import { FiltersDialog } from "./filtersDialog";
import { render, fireEvent } from "@testing-library/react";

describe("Filters dialog", () => {
  it("renders filters dialog", () => {
    const mockOnClose = vi.fn();
    render(<FiltersDialog openDialog onClose={mockOnClose} />);
  });
});
