import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./loadingSpinner";

vi.mock("@/store/useUserStore", () => ({
  default: vi.fn(() => ({
    accentColor: "#0177d2",
  })),
}));

describe("Loading Spinner Component", () => {
  test("renders the SVG with the correct fill color", () => {
    render(<LoadingSpinner />);
    const svg = screen.getByTestId("loading-spinner-svg");
    expect(svg).toHaveStyle("fill: #0177d2");
  });
});
