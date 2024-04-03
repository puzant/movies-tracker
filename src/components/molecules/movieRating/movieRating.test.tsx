import { render, screen } from "@testing-library/react";
import { MovieRating } from "./movieRating";

describe("Movie Rating Component", () => {
  it("renders the rating component with correct value", () => {
    const vote_average = 8.455;
    render(<MovieRating vote={vote_average} />);
    const ratingElement = screen.getByRole("img", { name: /4 Stars/i });

    expect(ratingElement.getAttribute("aria-label")).toBe("4 Stars");
  });
});
