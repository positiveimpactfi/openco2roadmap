import Head from "./Head";
import Button from "./ButtonWithLink";
import Footer from "./Footer";
import LogoArea from "./Logos";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Head />
      <Hero />
      <LogoArea />
      <Footer />
    </div>
  );
}

const Hero = () => {
  return (
    <main className="flex w-full  justify-center bg-teal-600 text-center ">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between lg:flex-row">
        <TravelCalculatorBox />
        <CertificateReaderBox />
      </div>
    </main>
  );
};

const TravelCalculatorBox = () => {
  return (
    <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:ml-10 lg:px-8">
      <div className="text-center">
        <h1 className="mt-1 text-4xl font-extrabold text-white">
          Matkailualan CO2-laskuri
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white">
          Haluatko tietää matkailuyrityksesi hiilijalanjäljen? Matkailualan
          maksuttomalla CO2-laskurilla voit laskea yrityksesi hiilijalanjäljen
          ja kartoittaa suurimmat päästölähteet. Tulosten avulla voit
          suunnitella toimintaa entistä ilmastoystävällisemmäksi ja viestiä
          ilmastotyöstä.
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <Button href="/register" title="Rekisteröidy käyttäjäksi" />
        <Button href="/login" title="Siirry kirjautumissivulle" />
      </div>
    </div>
  );
};

const CertificateReaderBox = () => {
  return (
    <div className="mx-auto mt-4 mb-8 flex max-w-sm flex-col items-center justify-center rounded-md bg-teal-900 px-4 pt-12 pb-8 sm:px-6 lg:mr-10 lg:h-96 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-white">
          Sertifikaattilukija
        </h2>
        <p className="mt-4 text-white">
          Sertifikaattilukija kokoaa matkailualan yritysten erilaisten
          sertifikaattien tiedot yhteen paikkaan.
        </p>
      </div>
      <div className="align-center mt-16 flex justify-center">
        <Button
          href="https://certreader.visitfinland.fi"
          title="Sirry lukijaan"
        />
      </div>
    </div>
  );
};
