import { render, screen } from "@testing-library/react";
import { MoviesList } from "./moviesList";

const mockMovie = {
  adult: false,
  backdrop_path: "/qbsMwtq6pXlf823z8u3qKPCeoM1.jpg",
  genre_ids: [80, 53, 28, 18],
  id: 671039,
  original_language: "fr",
  original_title: "Bronx",
  overview:
    "Caught in the crosshairs of police corruption and Marseille’s warring gangs, a loyal cop must protect his squad by taking matters into his own hands.",
  popularity: 21.092,
  poster_path: "/9HT9982bzgN5on1sLRmc1GMn6ZC.jpg",
  release_date: "2020-10-30",
  title: "Rogue City",
  video: false,
  vote_average: 5.876,
  vote_count: 563,
};

vi.mock("react-router-dom", () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

describe("Movie List Component", () => {
  test("it renders 'No Movies' message when movies array is empty", () => {
    render(<MoviesList movies={[]} />);
    expect(screen.getByText("no_movies")).toBeInTheDocument();
  });

  test("it renders a list of movies", () => {
    const { getByText } = render(<MoviesList movies={[mockMovie]} />);
    expect(getByText(mockMovie.original_title)).toBeInTheDocument();
  });

  test("it renders the correct movie poster", () => {
    const { getByRole } = render(<MoviesList movies={[mockMovie]} />);
    const imgElement = getByRole("img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w154/${mockMovie.poster_path}`
    );
  });
});
