import { render } from "@testing-library/react";
import { UpcomingMovies } from "./upcomingMovies";

const mockApiFunc = vi.fn();

const mockApiFunctions = {
  getUpcomingMovies: { func: mockApiFunc, key: "upcomingMovies" },
};

describe("Upcoming Movies component", () => {
  it("renders upcoming movies", () => {
    render(<UpcomingMovies apiFunctions={mockApiFunctions} />);
  });
});
