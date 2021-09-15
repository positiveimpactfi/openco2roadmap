import { PageLink } from "types/PageLink";
import { linksWithDefaultIcons } from "utils/linkWithDefaultIcon";

export const settingsLinks: PageLink[] = linksWithDefaultIcons([
  {
    name: "Yritysasetukset",
    description:
      "Yritysasetukset ja yrityskohtaiset päästökertoimet tällä sivulla.",
    href: "/settings/organization-settings",
  },
  {
    name: "Toimipaikat",
    description: "Lyhyt kuvaus",
    href: "/settings/sites",
  },
  {
    name: "Päästölähteet",
    description: "Lyhyt kuvaus",
    href: "/settings/emission-sources",
  },
  {
    name: "Päästökertoimet",
    description: "Lyhyt kuvaus",
    href: "/settings/emission-factors",
  },
]);
