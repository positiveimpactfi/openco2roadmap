import { ButtonHTMLAttributes } from "react";
import { classNames } from "utils/classNames";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  type,
  children,
}) => {
  return (
    <button
      type={type ?? "button"}
      className={classNames(
        "px-2 py-2 bg-teal-600 inline-flex items-center justify-center border border-transparent font-medium rounded-md text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
        disabled ? "opacity-50 cursor-not-allowed" : null
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
