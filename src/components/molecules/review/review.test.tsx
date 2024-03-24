import { fireEvent, render, screen } from "@testing-library/react";
import { Review } from "./review";
import { mockReview } from "@/mocks";

describe("Review Component", () => {
  test("renders review content initially truncated", () => {
    const { getByText } = render(<Review review={mockReview} />);

    expect(getByText("A review by " + mockReview.author)).toBeInTheDocument();
    expect(mockReview.content.substring(0, 550)).toHaveLength(550);
  });

  test('expands review content when "Read More" is clicked', () => {
    render(<Review review={mockReview} />);

    const readMoreButton = screen.getByText("...Read More");
    fireEvent.click(readMoreButton);
    const readLessButton = screen.getByText("Read Less");

    expect(readLessButton).toBeInTheDocument();
  });

  test('truncates content when "Read Less" is clicked', () => {
    render(<Review review={mockReview} />);

    const readMoreButton = screen.getByText("...Read More");
    fireEvent.click(readMoreButton);
    const readLessButton = screen.getByText("Read Less");
    fireEvent.click(readLessButton);

    expect(readMoreButton).toBeInTheDocument();
  });
});
