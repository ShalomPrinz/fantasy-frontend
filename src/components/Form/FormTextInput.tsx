import { useField } from "formik";

export type TextInput = {
  label: string;
  name: string;
  placeholder?: string;
  type: string;
};

interface FormTextInputProps {
  name: string;
  type: string;
  [x: string]: string;
}

export const FormTextInput = ({ label, ...props }: FormTextInputProps) => {
  const [field, meta] = useField(props);
  if (props.type === "password") props["autoComplete"] = "on";
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input className="form-text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </>
  );
};
