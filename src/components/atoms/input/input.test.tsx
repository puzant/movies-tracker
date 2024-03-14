import { vi } from "vitest";
import { render } from "@testing-library/react";
import { Input } from "./input";

vi.mock("formik", () => ({
  Field: ({ name, className, type }: any) => (
    <input name={name} className={className} aria-label={name} type={type} />
  ),
}));

describe("Input Component", () => {
  test("should handle field changes", () => {
    const { getByRole } = render(<Input name="testField" type="text" />);
    const inputElement = getByRole("textbox", { name: /testField/i });

    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveClass(
      "border",
      "border-gray-400",
      "w-full",
      "p-2",
      "rounded-md",
      "focus:outline-none"
    );
  });
});
