import { Field } from "formik";
import styles from "./styles.module.sass";

interface InputProps {
  name: string;
  type?: string;
}

export const Input = ({ name, type }: InputProps) => {
  return <Field name={name} className={styles.input} type={type} />;
};
