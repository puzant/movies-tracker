import { render } from "@testing-library/react";
import { ErrorMessage } from "./errorMessage";

describe("Error Message component", () => {
  it("renders error message", () => {
    const { getByRole } = render(<ErrorMessage />);
    const imageElement = getByRole("img");
    expect(imageElement).toBeInTheDocument();
  });
});
