import { screen, render } from "@testing-library/react";
import { Divider } from "./divider";

describe("Divider Component", () => {
  it("reneders a divider", () => {
    render(<Divider />);
    expect(screen.getByTestId("divider-component")).toHaveClass(
      "my-2.5 bg-gray-300 w-full h-[1px]"
    );
  });
});
