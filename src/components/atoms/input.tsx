import { Field } from 'formik';

interface InputProps {
  name: string;
  type?: string;
}

export const Input = ({ name, type }: InputProps) => {
  return (
    <Field
      name={name}
      className="border border-gray-400 w-full p-2 rounded-md focus:outline-none"
      type={type}
    />
  );
};
