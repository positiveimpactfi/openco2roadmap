import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  required?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  size: _,
  ...props
}) => {
  const [field, meta] = useField(props);
  const id = `${field.name}-id`;
  return (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        {...field}
        {...props}
        placeholder={field.name}
        id={id}
        required={required}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
      {meta.touched && meta.error ? (
        <div className="flex flex-row ml-auto text-red-400">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormField;
