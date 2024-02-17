import { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      style={props.style}
      disabled={props.disabled}
      type="submit"
      className="rounded-md px-4 py-2 mt-4 bg-blue-500 text-white w-fit"
    >
      {props.children}
    </button>
  );
};
