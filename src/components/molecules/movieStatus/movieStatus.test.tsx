import { render, screen } from "@testing-library/react";
import { MovieStatus } from "./movieStatus";
import { mockMovie } from "@/mocks";

describe("Movie Status Component", () => {
  test("it renders with correct props", () => {
    render(<MovieStatus movieDetails={mockMovie} />);
    expect(screen.getByText(mockMovie.status)).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
  });

  test("it renders keywords", () => {
    render(<MovieStatus movieDetails={mockMovie} />);
    mockMovie.keywords.keywords.forEach((keyword) => {
      expect(screen.getByText(keyword.name)).toBeInTheDocument();
    });
  });
});
