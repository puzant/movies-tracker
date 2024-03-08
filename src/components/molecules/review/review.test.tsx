import { fireEvent, render, screen } from "@testing-library/react";
import { Review } from "./review";

const mockReview = {
  author: "Manuel São Bento",
  author_details: {
    name: "Manuel São Bento",
    username: "msbreviews",
    avatar_path: null,
    rating: 10.0,
  },
  content:
    'FULL SPOILER-FREE REVIEW @ https://talkingfilms.net/dune-part-two-review-the-new-generational-epitome-of-sci-fi-epics/\r\n\r\n"Dune: Part Two surpasses even the highest expectations, establishing itself as an unquestionable technical masterpiece of blockbuster filmmaking.\r\n\r\nWith a narrative that deepens the complex web of political relationships, power, faith, love, and destiny, it not only provides a breathtaking audiovisual spectacle, thanks to the genius of Denis Villeneuve, Greig Fraser, and Hans Zimmer, but it also offers a profound meditation on universal human themes through thematically rich world-building and thoroughly developed characters. The superb performances of the entire cast, led by a career-best Timothée Chalamet and a mesmerizing Zendaya, further elevate this incredibly immersive cinematic experience.\r\n\r\nIt warrants comparisons with the greatest sequels in history, easily becoming the new generational epitome of sci-fi epics."\r\n\r\nRating: A+',
  created_at: "2024-02-22T21:00:01.602Z",
  id: "65d7b5d191f0ea0185e69bac",
  updated_at: "2024-02-22T21:00:01.712Z",
  url: "https://www.themoviedb.org/review/65d7b5d191f0ea0185e69bac",
};

test("renders review content initially truncated", () => {
  const { getByText } = render(<Review review={mockReview} />);
  expect(getByText("A review by " + mockReview.author)).toBeInTheDocument();
  expect(mockReview.content.substring(0, 550)).toHaveLength(550);
});

it('expands review content when "Read More" is clicked', () => {
  render(<Review review={mockReview} />);
  const readMoreButton = screen.getByText("...Read More");
  fireEvent.click(readMoreButton);
  const readLessButton = screen.getByText("Read Less");
  expect(readLessButton).toBeInTheDocument();
});

it('truncates content when "Read Less" is clicked', () => {
  render(<Review review={mockReview} />);
  const readMoreButton = screen.getByText("...Read More");
  fireEvent.click(readMoreButton);
  const readLessButton = screen.getByText("Read Less");
  fireEvent.click(readLessButton);
  expect(readMoreButton).toBeInTheDocument();
});
