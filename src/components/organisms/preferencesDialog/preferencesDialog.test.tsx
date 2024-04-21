import { fireEvent, render, screen } from "@testing-library/react";

import { PreferencesDialog } from "./preferencesDialog";
import usePreferencesDialog from "@/hooks/usePreferencesDialog";

const mockHandleUpdatePreferences = vi.fn();
const mockSetSelectedLanguage = vi.fn();
const mockSetSelectedColor = vi.fn();

vi.mock("@/hooks/usePreferencesDialog", () => ({
  default: vi.fn(() => ({
    accentColors: ["#0177d2", "#01b4e4"],
    t: (key: string) => key,
    handleUpdatePreferences: mockHandleUpdatePreferences,
    setSelectedLanguage: mockSetSelectedLanguage,
    setSelectedColor: mockSetSelectedColor,
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

  describe("PreferencesDialog props", () => {
    it("verifies openDialog prop is type boolean", () => {
      const mockOnClose = vi.fn();
      const openDialog = true;
      render(<PreferencesDialog openDialog onClose={mockOnClose} />);
      expect(openDialog).toBeTruthy();
    });

    it("verifies onClose prop is type function", () => {
      const mockOnClose = vi.fn();
      render(<PreferencesDialog openDialog onClose={mockOnClose} />);
      expect(typeof mockOnClose).toBe("function");
    });
  });

  describe("Close Dialog", () => {
    it("calls onClose method correctly", () => {
      const mockOnClose = vi.fn();
      const { getByTestId } = render(<PreferencesDialog openDialog onClose={mockOnClose} />);

      const closeButton = getByTestId("CloseIcon");
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Preferences Selection", () => {
    it("calls setColor method correctly", () => {
      const mockOnClose = vi.fn();
      const { setSelectedColor } = usePreferencesDialog(mockOnClose);
      const { getByTestId } = render(<PreferencesDialog openDialog onClose={mockOnClose} />);
      const accentColor = getByTestId("accent-color-0");

      fireEvent.click(accentColor);
      expect(setSelectedColor).toHaveBeenCalledWith("#0177d2");
    });

    it("calls setLanguage method correctly", () => {
      const mockOnClose = vi.fn();
      const { setSelectedLanguage } = usePreferencesDialog(mockOnClose);
      const { getByText } = render(<PreferencesDialog openDialog onClose={mockOnClose} />);
      const languageButton = getByText("French");

      fireEvent.click(languageButton);
      expect(setSelectedLanguage).toHaveBeenCalledWith("fr");
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
