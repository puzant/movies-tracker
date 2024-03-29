import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button Component", () => {
  describe("Rendering", () => {
    test("renders children correctly", () => {
      const { getByRole } = render(<Button>simple button</Button>);
      expect(getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Functionality", () => {
    test("calls onClick function", () => {
      const mockOnClick = vi.fn();
      render(<Button onClick={mockOnClick}>Click</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("does not call onClick when disabled", () => {
      const mockOnClick = vi.fn();

      render(
        <Button disabled onClick={mockOnClick}>
          Click
        </Button>
      );
      fireEvent.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("Button State", () => {
    test("is disabled when disabled prop is true", () => {
      const { getByRole } = render(<Button disabled>Click</Button>);
      const button = getByRole("button");
      expect(button).toBeDisabled();
    });

    test("is not disabled when disabled prop is false", () => {
      const { getByRole } = render(<Button>Click</Button>);
      const button = getByRole("button");
      expect(button).not.toBeDisabled();
    });
  });
});
