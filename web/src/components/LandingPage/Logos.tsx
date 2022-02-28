import Image from "next/image";
import kuusiAika from "../../../public/6aika.png";
import vipuvoimaa from "../../../public/vipuvoimaa.png";
import EU from "../../../public/EU.png";
import uudenmaanLiitto from "../../../public/uudenmaanliitto.png";
import helsinki from "../../../public/helsinki.png";
import forumVirium from "../../../public/forum_virium.png";
import turku from "../../../public/turku.png";
import visitTampere from "../../../public/visit_tampere.png";
import lapinLiitto from "../../../public/lapin_liitto.png";
import positiveImpact from "../../../public/pi.svg";

const LogoView = () => {
  return (
    <div className="mt-10 bg-white">
      <h2 className="text-center text-base font-semibold text-teal-600">
        Laskurin kehittämisen ovat mahdollistaneet:
      </h2>
      <div className="mx-auto max-w-screen-2xl py-12 px-16">
        <div className="grid grid-cols-2 place-items-center items-center justify-center gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 xl:gap-6">
          <div className="col-span-1 ">
            <Image src={kuusiAika} alt="6aika" />
          </div>
          <div className="col-span-1">
            <Image src={vipuvoimaa} alt="Vipuvoimaa EU:lta 2014-2020" />
          </div>
          <div className="col-span-1">
            <Image src={EU} alt="Euroopan unioni" />
          </div>
          <div className="col-span-1">
            <Image src={uudenmaanLiitto} alt="Uudenmaan liitto" />
          </div>
          <div className="col-span-1">
            <Image src={helsinki} alt="Helsingin kaupunki" />
          </div>
          <div className="col-span-1">
            <Image src={forumVirium} alt="Forum virium" />
          </div>
          <div className="col-span-1">
            <Image src={turku} alt="Turun kaupunki" />
          </div>
          <div className="col-span-1">
            <Image src={visitTampere} alt="Visit Tampere" />
          </div>
          <div className="col-span-1">
            <Image src={lapinLiitto} alt="Lapin liitto" />
          </div>
          <div className="col-span-1">
            <Image src={positiveImpact} alt="Positive Impact Finland" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoView;
