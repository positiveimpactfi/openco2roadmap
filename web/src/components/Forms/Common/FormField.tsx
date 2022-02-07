import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { classNames } from "utils/classNames";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  showLabel?: boolean;
  label?: string;
  name: string;
  placeholder: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  required?: boolean;
  variant?: "tight" | "normal";
};

const FormField: React.FC<FormFieldProps> = ({
  showLabel,
  label,
  required = false,
  placeholder,
  roundedTop,
  roundedBottom,
  variant = "normal",
  size: _,
  ...props
}) => {
  const [field, meta] = useField(props);
  const id = `${field.name}-id`;
  return (
    <div
      className={classNames(showLabel && variant === "normal" && "space-y-6")}
    >
      <label
        htmlFor={id}
        className={classNames(
          showLabel ? "mb-2 block text-sm font-medium text-gray-700" : "sr-only"
        )}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        id={id}
        required={required}
        className={classNames(
          "relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm " +
            (roundedTop ? "rounded-t-md " : null) +
            (roundedBottom ? "rounded-b-md " : null)
        )}
      />
      {meta.touched && meta.error ? (
        <div className="ml-auto flex flex-row text-red-400">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormField;
