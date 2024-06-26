import { render } from "@testing-library/react";
import { Actor } from "./actor";
import { mockActor } from "@/mocks";

describe("Actor Component", () => {
  it("renders with correct props", () => {
    const { getByText } = render(<Actor actor={mockActor} />);
    expect(getByText(mockActor.name)).toBeInTheDocument();
    expect(getByText(mockActor.character)).toBeInTheDocument();
  });

  it("renders with correct image URL when profile path is not null", () => {
    const { getByRole } = render(<Actor actor={mockActor} />);
    const imgElement = getByRole("img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w185/${mockActor.profile_path}`
    );
  });

  it("renders with fallback image URL when profile path is null", () => {
    const actorWithoutImage = { ...mockActor, profile_path: null };
    const { getByRole } = render(<Actor actor={actorWithoutImage} />);
    const imgElement = getByRole("img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      "https://d3uscstcbhvk7k.cloudfront.net/static/images/slider-placeholder-2x.png"
    );
  });
});
