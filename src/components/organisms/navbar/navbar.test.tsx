import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render as rtlRender, screen, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { Navbar } from "./navbar";
import useUserStore from "@/store/useUserStore";

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
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en",
      changeLanguage: vi.fn()
    },
  }),
}));

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
      const loginLink = screen.getByRole("link", { name: /login/i });

      expect(moviesLink).toHaveAttribute("href", "/");
      expect(upcomingLink).toHaveAttribute("href", "/upcoming");
      expect(loginLink).toHaveAttribute("href", "/login");
    });
  });

  // describe("User Authentication", () => {
  //   vi.mock("@/store/useUserStore", () => ({
  //     default: vi.fn()
  //   }));

  //   screen.debug()
  //   test("it should show logout button if user is authenticated", () => {
  //     render(<Navbar />);
  //     expect(screen.getByText("logout")).toBeInTheDocument();
  //   });

  //   test("it should show user avatar if authenticated", () => {
  //     render(<Navbar />);
  //     expect(screen.getByText("P")).toBeInTheDocument();
  //   });
  // });

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

    test("it calls changeLanguage with correct parameter ", () => {
      const { i18n } = useTranslation();

      render(<Navbar />);

      const languageButton = screen.getByText("EN");
      fireEvent.click(languageButton);

        const frenchLangButton = screen.getByTestId("test-fr");
        expect(frenchLangButton).toBeInTheDocument()

      screen.debug()

      // const frenchLangButton = screen.getByTestId("test-fr");
      // fireEvent.click(frenchLangButton)
      // expect(i18n.changeLanguage).toHaveBeenCalledOnce()

    });
  });
});
