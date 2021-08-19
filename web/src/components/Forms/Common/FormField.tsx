import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  showLabel?: boolean;
  label?: string;
  name: string;
  placeholder: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  required?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  showLabel,
  label,
  required = false,
  placeholder,
  roundedTop,
  roundedBottom,
  size: _,
  ...props
}) => {
  const [field, meta] = useField(props);
  const id = `${field.name}-id`;
  return (
    <div className={showLabel && "space-y-6"}>
      <div>
        <label
          htmlFor={id}
          className={
            showLabel
              ? "block text-sm font-medium text-gray-700 mb-2"
              : "sr-only"
          }
        >
          {label}
        </label>
        <input
          {...field}
          {...props}
          placeholder={placeholder}
          id={id}
          required={required}
          className={
            "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm " +
            (roundedTop ? "rounded-t-md " : "") +
            (roundedBottom ? "rounded-b-md " : "")
          }
        />
        {meta.touched && meta.error ? (
          <div className="flex flex-row ml-auto text-red-400">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default FormField;
