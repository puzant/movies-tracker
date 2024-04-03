import { fireEvent, render } from "@testing-library/react";

import { PreferencesDialog } from "./preferencesDialog";
import usePreferencesDialog from "@/hooks/usePreferencesDialog";

const mockHandleUpdatePreferences = vi.fn();

vi.mock("@/hooks/usePreferencesDialog", () => ({
  default: vi.fn(() => ({
    accentColors: ["#0177d2", "#01b4e4"],
    t: (key: string) => key,
    handleUpdatePreferences: mockHandleUpdatePreferences,
  })),
}));

describe("Preferences Dialog", () => {
  describe("Rendering", () => {
    it("should render correctly", () => {
      const mockOnClose = vi.fn();
      const { getByText } = render(<PreferencesDialog openDialog onClose={mockOnClose} />);
      expect(getByText("preferences")).toBeInTheDocument();
    });

    test("should render languages", () => {
      const mockOnClose = vi.fn();
      const { getByText } = render(<PreferencesDialog openDialog onClose={mockOnClose} />);
      expect(getByText("Arabic")).toBeInTheDocument();
    });

    it("should render accent colors", () => {
      const mockOnClose = vi.fn();
      const { getByTestId } = render(<PreferencesDialog openDialog onClose={mockOnClose} />);
      expect(getByTestId("accent-color-0")).toBeInTheDocument();
      expect(getByTestId("accent-color-1")).toBeInTheDocument();
    });
  });

  describe("Apply Preferences", () => {
    it("should call apply handleUpdatePreferences method", () => {
      const mockOnClose = vi.fn();
      const { handleUpdatePreferences } = usePreferencesDialog(mockOnClose);

      const { getByText } = render(<PreferencesDialog openDialog onClose={mockOnClose} />);
      const applyButton = getByText("apply");
      fireEvent.click(applyButton);
      expect(handleUpdatePreferences).toHaveBeenCalled();
    });
  });
});
