import { fireEvent, render } from "@testing-library/react";
import { Input } from "./input";

vi.mock("formik", () => ({
  Field: ({ name, className, type }: any) => (
    <input name={name} className={className} aria-label={name} type={type} />
  ),
}));

describe("Input Component", () => {
  it("should render input", () => {
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

  it("updates field value on change", () => {
    const { getByRole } = render(<Input name="testField" type="text" />);
    const inputElement: any = getByRole("textbox", { name: /testField/i });

    fireEvent.change(inputElement, { target: { value: "John Doe" } });
    expect(inputElement.value).toBe("John Doe");
  });
});
