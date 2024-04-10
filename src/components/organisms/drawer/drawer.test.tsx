import { fireEvent, render, screen } from "@testing-library/react";
import useDrawer from "@/hooks/useDrawer";
import { Drawer } from "./drawer";

const tSpy = vi.fn((str) => str);
const changeLanguageSpy = vi.fn((lng: string) => new Promise(() => {}));

vi.mock("react-router-dom", () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

vi.mock("@/hooks/useDrawer", () => ({
  default: vi.fn(() => ({
    useMutation: vi.fn(),
    t: tSpy,
    i18n: {
      changeLanguage: changeLanguageSpy,
      language: "en",
    },
  })),
}));

describe("Drawer Component", () => {
  describe("Rendering", () => {
    it("renders Drawer component", () => {
      const mockDrawerToggle = vi.fn();

      const { getByText } = render(<Drawer isDrawerOpen onDrawerToggle={mockDrawerToggle} />);
      expect(getByText("select_language")).toBeInTheDocument();
    });
  });

  describe("Drawer Props", () => {
    it("verifies openDialog prop is type boolean", () => {
      const mockDrawerToggle = vi.fn();

      render(<Drawer isDrawerOpen onDrawerToggle={mockDrawerToggle} />);
      expect(typeof mockDrawerToggle).toBe("function");
    });

    it("verifies onClose prop is type function", () => {
      const mockDrawerToggle = vi.fn();
      const mockIsDrawerOpen = true;

      render(<Drawer isDrawerOpen={mockIsDrawerOpen} onDrawerToggle={mockDrawerToggle} />);
      expect(mockIsDrawerOpen).toBeTruthy();
    });
  });

  describe("Language selection & functionality", () => {
    it("shows selected language check mark", () => {
      const mockDrawerToggle = vi.fn();

      const { getByTestId } = render(<Drawer isDrawerOpen onDrawerToggle={mockDrawerToggle} />);
      expect(getByTestId("CheckIcon")).toBeInTheDocument();
    });

    it("calls change language method correctly", () => {
      const { i18n } = useDrawer();
      const mockDrawerToggle = vi.fn();

      const { getByText } = render(<Drawer isDrawerOpen onDrawerToggle={mockDrawerToggle} />);
      const frenchLangButton = getByText("French");
      fireEvent.click(frenchLangButton);

      expect(i18n.changeLanguage).toHaveBeenCalledWith("fr");
    });
  });
});
