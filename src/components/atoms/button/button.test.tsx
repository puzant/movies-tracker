import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button Component", () => {
  let mockOnClick: () => void;
  beforeEach(() => {
    mockOnClick = vi.fn();
  });

  describe("Rendering", () => {
    it("renders children correctly", () => {
      const { getByRole } = render(<Button>simple button</Button>);
      expect(getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Functionality", () => {
    it("calls onClick function", () => {
      render(<Button onClick={mockOnClick}>Click</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      render(
        <Button disabled onClick={mockOnClick}>
          Click
        </Button>
      );
      fireEvent.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when onClick function is not passed", () => {
      render(<Button>Click</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("Button State", () => {
    it("is disabled when disabled prop is true", () => {
      const { getByRole } = render(<Button disabled>Click</Button>);
      const button = getByRole("button");
      expect(button).toBeDisabled();
    });

    it("is not disabled when disabled prop is false", () => {
      const { getByRole } = render(<Button>Click</Button>);
      const button = getByRole("button");
      expect(button).not.toBeDisabled();
    });
  });
});
