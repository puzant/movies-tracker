import { render, screen } from "@testing-library/react";
import { mockMovie } from "@/mocks";
import { Movie } from "./movie";

describe("Movie Component", () => {
  test("renders a movie component", () => {
    render(<Movie movie={mockMovie} />);
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText("February 27, 2024")).toBeInTheDocument();
  });

  test("displays placeholder if movie poster path is missing", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<Movie movie={movieWithoutPoster} />);
    expect(screen.getByAltText("Movie Poster Placeholder")).toBeInTheDocument();
  });

  test("displayes correct movie poster", () => {
    render(<Movie movie={mockMovie} />);
    const moviePoster = screen.getByAltText(mockMovie.title);
    expect(moviePoster).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w342/${mockMovie.poster_path}`
    );
  });

  test("renders a correct movie rating", () => {
    render(<Movie movie={mockMovie} />);
    expect(mockMovie.vote_average).toEqual(mockMovie.vote_average);
  });
});
