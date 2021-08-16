import { GlobeAltIcon } from "@heroicons/react/outline";

export const adminLinks = [
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
