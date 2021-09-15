import { PageLink } from "types/PageLink";
import { linksWithDefaultIcons } from "utils/linkWithDefaultIcon";

export const calculatorLinks: PageLink[] = linksWithDefaultIcons([
  {
    name: "Toimipaikat",
    description:
      "Hiilijalanjälkilaskentaan tarvittavat kulutustiedot liittyvät aina konkreettisesti johonkin yrityksesi toimipaikkaan. Tällä sivulla näet yrityksesi hiilijalanjälkilaskennassa käytetyn toimipaikkarakenteen.",
    href: "/calculator/sites",
  },
  {
    name: "Päästolähteet",
    description: "Tutki mitä päästölähteitä yrityksesi laskentaan sisältyy.",
    href: "/calculator/emission-sources",
  },
  {
    name: "Päästökertoimet",
    description:
      "Tutki mitä päästökertoimia yrityksesi laskentaan on käytettävissä.",
    href: "/calculator/emission-factors",
  },
  {
    name: "Kulutustiedot",
    description:
      "Hiilijalanjäljen laskeminen perustuu yrityksesi todellisiin kulutustietoihin. Saat nämä mm. energiayhtiöiltä, ajopäiväkirjoista ja kirjanpidosta. sivun kautta syötät energian, jätteiden, hankintojen ja hallinnon eri kulutustiedot, kuukausi- tai vuositasolla.",
    href: "/calculator/consumption-data",
  },
  {
    name: "Hiilijalanjäljet",
    description:
      "Päästölaskennan yhteenvedot muodostetaan hiilijalanjäljet-sivulla.",
    href: "/calculator/footprints",
  },
]);
