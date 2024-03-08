import { render } from "@testing-library/react";
import { Actor } from "./actor";

const mockActor = {
  adult: false,
  gender: 2,
  id: 1190668,
  known_for_department: "Acting",
  name: "Timothée Chalamet",
  original_name: "Timothée Chalamet",
  popularity: 186.465,
  profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg",
  cast_id: 2,
  character: "Paul Atreides",
  credit_id: "5e959c45955c6500159f1c98",
  order: 0,
};

test("it renders with correct props", () => {
  const { getByText } = render(<Actor actor={mockActor} />);
  expect(getByText(mockActor.name)).toBeInTheDocument();
  expect(getByText(mockActor.character)).toBeInTheDocument();
});

it("renders with correct image URL when profile_path is not null", () => {
  const { getByRole } = render(<Actor actor={mockActor} />);
  const imgElement = getByRole("img");
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute(
    "src",
    `https://image.tmdb.org/t/p/w185/${mockActor.profile_path}`
  );
});

it("renders with fallback image URL when profile_path is null", () => {
  const actorWithoutImage = { ...mockActor, profile_path: null };
  const { getByRole } = render(<Actor actor={actorWithoutImage} />);
  const imgElement = getByRole("img");
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute(
    "src",
    "https://d3uscstcbhvk7k.cloudfront.net/static/images/slider-placeholder-2x.png"
  );
});
