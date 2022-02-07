import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import { classNames } from "utils/classNames";
import Link from "next/link";
import { ExternalLinkIcon } from "@heroicons/react/outline";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  description: string;
  href?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  href,
  ...props
}) => {
  const [field, meta] = useField(props);
  const id = `${field.name}-id`;
  const describedBy = `${field.name}-describedBy`;
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          {...field}
          {...props}
          id={id}
          aria-describedby={describedBy}
          name={props.name}
          type="checkbox"
          value={field.value}
          className={classNames(
            meta.touched && meta.error
              ? " text-red-500 focus:ring-red-500"
              : "text-teal-600 focus:ring-teal-500",
            "h-4 w-4  rounded border-gray-300"
          )}
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={id}
          className={classNames(
            meta.touched && meta.error ? "text-red-500" : "text-gray-700",
            "font-medium"
          )}
        >
          {label}
        </label>
        {href ? (
          <div>
            <span className="group flex items-center space-x-1">
              <Link href={href} passHref>
                <a
                  className="text-gray-500 group-hover:cursor-pointer group-hover:text-gray-700"
                  target="_blank"
                  rel="no-referrer"
                >
                  {description}
                </a>
              </Link>
              <ExternalLinkIcon className="h-4 text-gray-500 group-hover:cursor-pointer group-hover:text-gray-700" />
            </span>
          </div>
        ) : (
          <p id={describedBy} className="text-gray-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
