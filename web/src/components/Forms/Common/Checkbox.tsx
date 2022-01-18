import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import { classNames } from "utils/classNames";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  description: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  ...props
}) => {
  const [field, meta] = useField(props);
  const id = `${field.name}-id`;
  const describedBy = `${field.name}-describedBy`;
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          {...field}
          {...props}
          id={id}
          aria-describedby={describedBy}
          name={props.name}
          type="checkbox"
          value={field.value}
          className={classNames(
            meta.error
              ? "text-red-500 ring-red-500"
              : "focus:ring-teal-500 text-teal-600",
            "h-4 w-4  border-gray-300 rounded"
          )}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-700">
          {label}
        </label>
        <p id={describedBy} className="text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Checkbox;
