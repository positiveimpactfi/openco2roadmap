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
        "inline-flex items-center  justify-center rounded-md border px-4  py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
        variant === "neutral"
          ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          : variant === "danger"
          ? "border-transparent bg-red-600 text-white hover:bg-red-700"
          : "border-transparent bg-teal-600 text-white hover:bg-teal-700 ",
        disabled ? "cursor-not-allowed opacity-50" : null
      )}
      onClick={disabled ? null : onClick}
    >
      {children}
    </button>
  );
};

export default Button;
