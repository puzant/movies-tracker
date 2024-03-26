import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button Component", () => {
  test("it renders children correctly", () => {
    const { getByText } = render(<Button>simple button</Button>);
    expect(getByText("simple button")).toBeInTheDocument();
  });

  test("it calls onClick function", () => {
    const mockOnClick = vi.fn();

    render(<Button onClick={mockOnClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("it should not call onClick function when button is disabled", () => {
    const mockOnClick = vi.fn();

    render(
      <Button disabled onClick={mockOnClick}>
        Click
      </Button>
    );

    fireEvent.click(screen.getByText("Click"));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test("button is disabled when disabled prop is true", () => {
    const { getByRole } = render(<Button disabled>Click</Button>);
    const button = getByRole("button");

    expect(button).toBeDisabled();
  });

  test("button is not disabled when disabled prop is false", () => {
    const { getByRole } = render(<Button>Click</Button>);
    const button = getByRole("button");

    expect(button).not.toBeDisabled();
  });
});
