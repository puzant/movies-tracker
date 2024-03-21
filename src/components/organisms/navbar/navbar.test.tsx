import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import LanguageDetector from "i18next-browser-languagedetector";
import { fireEvent, render as rtlRender, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar } from "./navbar";

import en from "@/locale/en.json";
import fr from "@/locale/fr.json";
import ar from "@/locale/ar.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ["localStorage", "navigator"],
    },
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
      ar: {
        translation: ar,
      },
    },
    debug: false,
  });

const render = (ui: any, options?: any) => {
  const queryClient = new QueryClient();

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <Router>{ui}</Router>
    </QueryClientProvider>,
    options
  );
};

vi.mock("@/store/useUserStore", () => ({
  default: vi.fn(() => ({
    isAuthenticated: true,
    username: "puzant",
  })),
}));

describe("Navbar Component", () => {
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

  test("it should show logout button if user is authenticated", () => {
    render(<Navbar />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("it should show user avatar if authenticated", () => {
    render(<Navbar />);
    expect(screen.getByText("P")).toBeInTheDocument();
  });

  test("it should not redirect to search results page if there's no serach query", () => {
    render(<Navbar />);

    const serachIcon = screen.getByTestId("SearchIcon");
    fireEvent.click(serachIcon);

    const searchInput = screen.getByPlaceholderText("Search for a movie");

    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });
    expect(window.location.pathname).not.toBe("/search-results");
  });

  test("it opens search bar on search icon click and redirects to search results on click Enter", () => {
    render(<Navbar />);

    const serachIcon = screen.getByTestId("SearchIcon");
    fireEvent.click(serachIcon);

    const searchInput = screen.getByPlaceholderText("Search for a movie");

    fireEvent.change(searchInput, { target: { value: "test search query" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });
    expect(window.location.pathname).toBe("/search-results");
  });

  test("it opens language selection menu when language button is clicked", () => {
    render(<Navbar />);

    const languageButton = screen.getByText("EN-US");
    fireEvent.click(languageButton);
    expect(screen.getByText("Select a language")).toBeInTheDocument();
  });

  test("it changes to the selected language", () => {
    render(<Navbar />);

    const languageButton = screen.getByText("EN-US");
    fireEvent.click(languageButton);
    fireEvent.click(screen.getByText("French"));
    expect(screen.getByText("FR"));
  });
});
