const Footer = () => {
  return (
    <footer className="py-12 px-4 text-center text-xs font-normal text-gray-400 sm:px-10 lg:px-16">
      Matkailualan CO2-laskuri on Lapin liiton Välkky-hankkeen ja 6Aika: Carbon
      Neutral Tourism -hankkeen yhdessä{" "}
      <span className="underline hover:text-gray-500">
        <a href="https://positiveimpact.fi">Positive Impactin</a>
      </span>{" "}
      kanssa luoma{" "}
      <span className="underline hover:text-gray-500">
        <a href="https://github.com/positiveimpactfi/openco2roadmap">
          avoimen lähdekoodin hiilijalanjälkilaskuriprojekti
        </a>
      </span>
      . Laskuri on tarkoitettu suomalaisille ja Suomessa toimiville matkailualan
      yrityksille ja sitä päivitetään ja ylläpidetään aktiivisesti
      kehittäjäverkoston toimesta.
    </footer>
  );
};

export default Footer;
