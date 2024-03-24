import { render, screen } from "@testing-library/react";
import { MovieTabs } from "./movieTabs";

describe("Movie Tabs Component", () => {
  test("it renders tabs correctly", () => {
    render(<MovieTabs favoriteMovies={[]} moviesInWatchlist={[]} ratedMovies={[]} />);

    expect(screen.getByText("favorites")).toBeInTheDocument();
    expect(screen.getByText("watchlist")).toBeInTheDocument();
    expect(screen.getByText("rated_movies")).toBeInTheDocument();
  });
});
