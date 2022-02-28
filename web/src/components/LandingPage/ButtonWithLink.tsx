import Link from "next/link";
import React from "react";

const Button: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
  href,
  title,
}) => {
  return (
    <Link href={href} passHref>
      <a
        className="rounded-md bg-white px-4 py-2 text-sm text-gray-500
    hover:text-teal-600"
      >
        {title}
      </a>
    </Link>
  );
};

export default Button;
