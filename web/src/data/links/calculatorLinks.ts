import { GlobeAltIcon } from "@heroicons/react/outline";
import { PageLink } from "./adminLinks";

export const calculatorLinks: PageLink[] = [
  {
    name: "Toimipaikat",
    description:
      "Hiilijalanjälkilaskentaan tarvittavat kulutustiedot liittyvät aina konkreettisesti johonkin yrityksesi toimipaikkaan. Ennen kulutustietojen kirjaamista määrittele täällä yrityksesi toimipaikat ja niiden sijainnit.",
    icon: GlobeAltIcon,
    href: "/calculator/sites",
  },
  {
    name: "Päästolähteet",
    description:
      "Tutki mitä päästölähteitä yrityksesi laskentaan sisältyy. Voit muokata näihin liittyviä päästökertoimia asetuksissa.",
    icon: GlobeAltIcon,
    href: "/calculator/emission-sources",
  },
  {
    name: "Päästökertoimet",
    description:
      "Tutki mitä päästölähteitä yrityksesi laskentaan sisältyy. Voit muokata näihin liittyviä päästökertoimia asetuksissa.",
    icon: GlobeAltIcon,
    href: "/calculator/emission-factors",
  },
  {
    name: "Kulutustiedot",
    description:
      "Hiilijalanjäljen laskeminen perustuu yrityksesi todellisiin kulutustietoihin. Saat nämä mm. energiayhtiöiltä, ajopäiväkirjoista ja kirjanpidosta. sivun kautta syötät energian, jätteiden, hankintojen ja hallinnon eri kulutustiedot, kuukausi- tai vuositasolla.",
    icon: GlobeAltIcon,
    href: "/calculator/consumption-data",
  },
  {
    name: "Hiilijalanjäljet",
    description:
      "Päästölaskennan tuloksia pääset tutkimaan hiilijalanjäljet-sivulla.",
    icon: GlobeAltIcon,
    href: "/calculator/footprints",
  },
];
