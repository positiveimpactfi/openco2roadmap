import { GlobeAltIcon } from "@heroicons/react/outline";
import { PageLink } from "./adminLinks";

export const settingsLinks: PageLink[] = [
  {
    name: "Yritysasetukset",
    description:
      "Yritysasetukset ja yrityskohtaiset päästökertoimet tällä sivulla.",
    icon: GlobeAltIcon,
    href: "/settings/organization-settings",
  },
  {
    name: "Toimipaikat",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/settings/sites",
  },
  {
    name: "Päästölähteet",
    description: "Lyhyt kuvaus",
    icon: GlobeAltIcon,
    href: "/settings/emission-sources",
  },
  {
    name: "Päästökertoimet",
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
