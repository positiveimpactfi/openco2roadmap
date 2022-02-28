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
    <main className="flex w-full flex-1 flex-col justify-between text-center">
      <div className="bg-teal-600">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mt-1 text-4xl font-extrabold text-white">
              Matkailualan CO2-laskuri
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white">
              Haluatko tietää matkailuyrityksesi hiilijalanjäljen? Matkailualan
              maksuttomalla CO2-laskurilla voit laskea yrityksesi
              hiilijalanjäljen ja kartoittaa suurimmat päästölähteet. Tulosten
              avulla voit suunnitella toimintaa entistä ilmastoystävällisemmäksi
              ja viestiä ilmastotyöstä.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Button href="/register" title="Rekisteröidy käyttäjäksi" />
            <Button href="/login" title="Siirry kirjautumissivulle" />
          </div>
        </div>
      </div>
    </main>
  );
};
