import { GlobeAltIcon } from "@heroicons/react/outline";

const features = [
  {
    name: "Yritykset",
    description:
      "Luettelo kaikista laskuria käyttävistä yrityksistä. Voit lisätä uusia yrityksiä, ja muokata yritysten tietoja. Yritysten poistaminen laskurista ei ole tätä kautta mahdollista. ",
    icon: GlobeAltIcon,
  },
  {
    name: "Päästökertoimet",
    description:
      "Luettelo kaikista laskurin yleisistä päästökertoimista. Voit lisätä, muokata päästökertoimia vapaasti. Muutokset tulevat käyttöön välittömästi kaikille laskurin yrityksille ja käyttäjille. ",
    icon: GlobeAltIcon,
  },
  {
    name: "Käyttäjät",
    description:
      "Luettelo kaikista laskurin käyttäjistä. Voit lisätä, muokata ja poistaa käyttäjiä, sekä antaa näille käyttöoikeuden laskurin eri yrityksiin.",
    icon: GlobeAltIcon,
  },
  {
    name: "Tunnusluvut",
    description:
      "Tunnusluvut-osiossa määrittelet, mitä erilaisia tietoja yrityksiltä kysytään ilmastovaikutuksista kertovien hiilijalanjäljen tunnuslukujen laskemiseksi ja yritysten vertailua varten.",
    icon: GlobeAltIcon,
  },
  {
    name: "Toimipaikkojen asetukset",
    description:
      "Mitä eri toimipaikkatyyppejä ja osastoja laskuri tarjoaa yritysten rajauksen tekemistä varten.",
    icon: GlobeAltIcon,
  },
  {
    name: "Vertailuarvot",
    description:
      "Vertailuarvot ovat lukemia, joihin yrityksen hiilijalanjälki suhteutetaan. Nämä tulevat kaikkien laskurin käyttäjien näkyville yrityksen hiilijalanjälkilaskelmien yhteydessä.",
    icon: GlobeAltIcon,
  },
  {
    name: "Päästölähteet",
    description:
      "Määrittele, mitä päästölähteitä yritykset voivat ottaa mukaan laskentaansa.",
    icon: GlobeAltIcon,
  },
  {
    name: "Käyttötilastot",
    description: "(Tulossa myöhemmin)",
    icon: GlobeAltIcon,
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-12 lg:px-8">
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name}>
              <div className="flex flex-row">
                <span className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500">
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="text-lg font-medium text-black ml-4">
                  {feature.name}
                </h3>
              </div>
              <div className="mt-6">
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
