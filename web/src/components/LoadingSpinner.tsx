import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../public/logo.svg";

const LoadingSpinner: React.FC<{ delay?: number }> = ({ delay = 2000 }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [setShow, delay]);
  if (!show) return null;
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <div className="mb-6 animate-spin">
          <Image src={logo} alt="loading image" />
        </div>
        <div>Ladataan...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
