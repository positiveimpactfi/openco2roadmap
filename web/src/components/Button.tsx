interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="px-2 py-2 mb-4 bg-teal-600 inline-flex items-center justify-center text-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
