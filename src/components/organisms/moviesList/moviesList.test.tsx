import { fireEvent, render, screen } from "@testing-library/react";
import { MoviesList } from "./moviesList";
import { mockListMovie } from "@/mocks";

vi.mock("react-router-dom", () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

describe("Movie List Component", () => {
  test("it renders 'No Movies' message when movies array is empty", () => {
    render(<MoviesList movies={[]} />);
    expect(screen.getByText("no_movies")).toBeInTheDocument();
  });

  test("it renders a list of movies", () => {
    const { getByText } = render(<MoviesList movies={[mockListMovie]} />);
    expect(getByText(mockListMovie.original_title)).toBeInTheDocument();
  });

  test("it renders the correct movie poster", () => {
    const { getByRole } = render(<MoviesList movies={[mockListMovie]} />);
    const imgElement = getByRole("img");

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w154/${mockListMovie.poster_path}`
    );
  });
});
