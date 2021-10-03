import { ButtonHTMLAttributes } from "react";
import { classNames } from "utils/classNames";

type ButtonVariant = "success" | "danger" | "neutral";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  type,
  children,
  variant = "neutral",
}) => {
  return (
    <button
      type={type ?? "button"}
      className={classNames(
        "px-4 py-2  inline-flex items-center justify-center border  text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
        variant === "neutral"
          ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          : variant === "danger"
          ? "bg-red-600 text-white border-transparent hover:bg-red-700"
          : "bg-teal-600 text-white border-transparent hover:bg-teal-700 ",
        disabled ? "opacity-50 cursor-not-allowed" : null
      )}
      onClick={disabled ? null : onClick}
    >
      {children}
    </button>
  );
};

export default Button;
