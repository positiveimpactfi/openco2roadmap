import logo from "../../public/logo.svg";
import Image from "next/image";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col w-96">
      <div className="animate-spin mb-6">
        <Image src={logo} alt="loading image" />
      </div>
      <div>Ladataan..</div>
    </div>
  );
};

export default LoadingSpinner;
