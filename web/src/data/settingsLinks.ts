import { GlobeAltIcon } from "@heroicons/react/outline";
import { PageLink } from "./adminLinks";

export const settingsLinks: PageLink[] = [
  {
    name: "Toimipaikat",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/settings/sites",
  },
  {
    name: "Päästolähteet",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/settings/emission-sources",
  },
  {
    name: "Kulutustiedot",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/settings/consumption-data",
  },
  {
    name: "Hiilijalanjäljet",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/settings/footprints",
  },
];
