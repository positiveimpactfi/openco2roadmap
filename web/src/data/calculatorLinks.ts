import { GlobeAltIcon } from "@heroicons/react/outline";
import { PageLink } from "./adminLinks";

export const calculatorLinks: PageLink[] = [
  {
    name: "Toimipaikat",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/calculator/sites",
  },
  {
    name: "Päästolähteet",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/calculator/emission-sources",
  },
  {
    name: "Kulutustiedot",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/calculator/consumption-data",
  },
  {
    name: "Hiilijalanjäljet",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/calculator/footprints",
  },
];
