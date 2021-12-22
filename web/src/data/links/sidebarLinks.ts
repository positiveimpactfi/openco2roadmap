import {
  CalculatorIcon,
  CogIcon,
  HomeIcon,
  ServerIcon,
} from "@heroicons/react/outline";
import { PageLink } from "types/PageLink";

export const sidebarLinks: PageLink[] = [
  {
    name: "home",
    href: "/",
    icon: HomeIcon,
    description:
      "Tervetuloa käyttämään matkailualan yritysten hiilijalanjälkilaskuria!",
  },
  {
    name: "calculator",
    href: "/calculator",
    icon: CalculatorIcon,
    description:
      "Laskuri-osiossa voit syöttää ja muokata yrityksesi kulutustietoja.",
  },
  {
    name: "settings",
    href: "/settings",
    icon: CogIcon,
    description:
      "Asetukset-osiossa pääset muokkaamaan yrityksesi hiilijalanjälkilaskentaan tarvittavia tietoja.",
  },
  {
    name: "admin",
    href: "/admin",
    icon: ServerIcon,
    description: "Näillä sivuilla voit muokata CO2-laskurin asetuksia.",
  },
];
