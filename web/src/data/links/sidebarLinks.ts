import {
  CalculatorIcon,
  CogIcon,
  HomeIcon,
  ServerIcon,
} from "@heroicons/react/outline";
import { PageLink } from "types/PageLink";

export const sidebarLinks: PageLink[] = [
  {
    name: "Etusivu",
    href: "/",
    icon: HomeIcon,
    description:
      "Tervetuloa käyttämään matkailualan yritysten hiilijlanjälkilaskuria!",
  },
  {
    name: "Laskuri",
    href: "/calculator",
    icon: CalculatorIcon,
    description:
      "Laskuri-osiossa voit syöttää ja muokata yrityksesi kulutustietoja",
  },
  {
    name: "Asetukset",
    href: "/settings",
    icon: CogIcon,
    description:
      "Asetukset-osiossa pääset muokkaamaan yrityksesi hiilijalanjälkilaskentaan tarvittavia tietoja.",
  },
  {
    name: "Hallintapaneeli",
    href: "/admin",
    icon: ServerIcon,
    description: "Näillä sivuilla voit muokata CO2-laskurin asetuksia.",
  },
];
