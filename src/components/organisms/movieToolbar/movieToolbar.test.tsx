import { render, fireEvent, getByTestId } from "@testing-library/react";
import { MovieToolbar } from "./movieToolbar";

vi.mock("@/store/useUserStore", () => ({
  default: vi.fn(() => ({
    isAuthenticated: true,
  })),
}));

describe("MovieToolbar Component", () => {
  test("it should show different tooltip if authenticated", () => {
    const { getByLabelText } = render(<MovieToolbar movieId={123} />);

    expect(getByLabelText("add_movie_to_favorite")).toBeInTheDocument();
    expect(getByLabelText("add_movie_to_watch_list")).toBeInTheDocument();
    expect(getByLabelText("rate_movie")).toBeInTheDocument();
  });

  // test("it should show rating compoent, when clicked on add rating label", () => {
  //   const { getByLabelText, getByTestId } = render(<MovieToolbar movieId={123} />);

  //   const ratingComponent = getByLabelText("rate_movie");
  //   fireEvent.click(ratingComponent);
  //   expect(getByTestId("rating-movie-component")).toBeInTheDocument();
  // });
});
