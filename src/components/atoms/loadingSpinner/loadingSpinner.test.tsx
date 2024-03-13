import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./loadingSpinner";

vi.mock("@/store/useUserStore");

describe("Loading Spinner Component", () => {
  test("renders the SVG with the correct fill color", () => {
    render(<LoadingSpinner />);
    const svg = screen.getByTestId("loading-spinner-svg");
    expect(svg).toHaveAttribute("fill", "#0177d2");
  });
});
