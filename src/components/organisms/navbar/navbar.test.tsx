import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render as rtlRender, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { Navbar } from "./navbar";

const render = (ui: any, options?: any) => {
  const queryClient = new QueryClient();

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <Router>{ui}</Router>
    </QueryClientProvider>,
    options
  );
};

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(),
}));

vi.mock("@/store/useUserStore", () => ({
  default: vi.fn(() => ({
    isAuthenticated: true,
    username: "puzant",
  })),
}));

const tSpy = vi.fn((str) => str);
const changeLanguageSpy = vi.fn((lng: string) => new Promise(() => {}));
const useTranslationSpy = useTranslation as any;

beforeEach(() => {
  vi.clearAllMocks();

  useTranslationSpy.mockReturnValue({
    t: tSpy,
    i18n: {
      changeLanguage: changeLanguageSpy,
      language: "en",
    },
  });
});

describe("Navbar Component", () => {
  describe("Rendering", () => {
    test("it renders Navbar", () => {
      const { container } = render(<Navbar />);
      expect(container).toBeInTheDocument();
    });

    test("it renders Navigation Links correctly", () => {
      render(<Navbar />);

      const moviesLink = screen.getByRole("link", { name: /movies/i });
      const upcomingLink = screen.getByRole("link", { name: /upcoming/i });

      expect(moviesLink).toHaveAttribute("href", "/");
      expect(upcomingLink).toHaveAttribute("href", "/upcoming");
    });
  });

  describe("User Authentication", () => {
    test("it should render user avatar correctly", () => {
      render(<Navbar />);
      const profileLink = screen.getByRole("link", { name: "P" });

      expect(profileLink).toBeInTheDocument();
    });

    test("it should show logout button if user is authenticated", () => {
      render(<Navbar />);
      expect(screen.getByText("logout")).toBeInTheDocument();
    });

    test("it should call logout function correctly", () => {
      render(<Navbar />);
      const useDeleteSessionMutation = vi.fn();

      screen.debug();
      const logoutButton = screen.getByText("logout");
      expect(logoutButton).toBeInTheDocument();

      fireEvent.click(logoutButton);
      expect(useDeleteSessionMutation).toHaveBeenCalled();
    });
  });

  describe("Search Functionality", () => {
    test("it should not redirect to search results page if there's no serach query", () => {
      render(<Navbar />);

      const serachIcon = screen.getByTestId("SearchIcon");
      fireEvent.click(serachIcon);

      const searchInput = screen.getByPlaceholderText("search_movie_placeholder");

      fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });
      expect(window.location.pathname).not.toBe("/search-results");
    });

    test("it opens search bar on search icon click and redirects to search results on click Enter", () => {
      render(<Navbar />);

      const serachIcon = screen.getByTestId("SearchIcon");
      fireEvent.click(serachIcon);

      const searchInput = screen.getByPlaceholderText("search_movie_placeholder");

      fireEvent.change(searchInput, { target: { value: "test search query" } });
      fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });
      expect(window.location.pathname).toBe("/search-results");
    });
  });

  describe("Language Selection", () => {
    test("it opens language selection menu when language button is clicked", () => {
      render(<Navbar />);

      const languageButton = screen.getByText("EN");
      fireEvent.click(languageButton);
      expect(screen.getByText("select_language")).toBeInTheDocument();
    });

    test("it calls change Language with correct parameter", () => {
      const { i18n } = useTranslation();
      render(<Navbar />);

      const languageButton = screen.getByText("EN");
      fireEvent.click(languageButton);

      const frenchLangButton = screen.getByTestId("test-fr");
      expect(frenchLangButton).toBeInTheDocument();

      fireEvent.click(frenchLangButton);
      expect(i18n.changeLanguage).toHaveBeenCalledWith("fr");
    });
  });
});
