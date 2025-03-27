import { ReactNode, CSSProperties } from "react";
import styles from "./styles.module.sass";

interface ButtonProps {
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export const Button = (props: ButtonProps) => {
  const handleOnClick = () => {
    if (!props.disabled && props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      onClick={handleOnClick}
      style={props.style}
      disabled={props.disabled}
      type="submit"
      className={styles.button}
    >
      {props.children}
    </button>
  );
};
