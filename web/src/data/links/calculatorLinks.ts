import { PageLink } from "types/PageLink";
import { linksWithDefaultIcons } from "utils/linkWithDefaultIcon";

export const calculatorLinks: PageLink[] = linksWithDefaultIcons([
  {
    name: "sites",
    description:
      "Hiilijalanjälkilaskentaan tarvittavat kulutustiedot liittyvät aina konkreettisesti johonkin yrityksesi toimipaikkaan. Tällä sivulla näet yrityksesi hiilijalanjälkilaskennassa käytetyn toimipaikkarakenteen.",
    href: "/calculator/sites",
  },
  {
    name: "emission_sources",
    description: "Tutki mitä päästölähteitä yrityksesi laskentaan sisältyy.",
    href: "/calculator/emission-sources",
  },
  {
    name: "emission_factors",
    description:
      "Tutki mitä päästökertoimia yrityksesi laskentaan on käytettävissä.",
    href: "/calculator/emission-factors",
  },
  {
    name: "consumption_data",
    description:
      "Hiilijalanjäljen laskeminen perustuu yrityksesi todellisiin kulutustietoihin. Saat nämä mm. energiayhtiöiltä, ajopäiväkirjoista ja kirjanpidosta. sivun kautta syötät energian, jätteiden, hankintojen ja hallinnon eri kulutustiedot, kuukausi- tai vuositasolla.",
    href: "/calculator/consumption-data",
  },
  {
    name: "footprints",
    description:
      "Päästölaskennan yhteenvedot muodostetaan hiilijalanjäljet-sivulla.",
    href: "/calculator/footprints",
  },
]);
