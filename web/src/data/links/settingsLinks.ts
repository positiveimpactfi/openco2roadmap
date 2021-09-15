import { PageLink } from "types/PageLink";
import { linksWithDefaultIcons } from "utils/linkWithDefaultIcon";

export const settingsLinks: PageLink[] = linksWithDefaultIcons([
  {
    name: "Yritysasetukset",
    description: "Yrityksen perustietoja voi muokata tällä sivulla.",
    href: "/settings/organization-settings",
  },
  {
    name: "Toimipaikat",
    description:
      "Ennen laskennan aloittamista luo yrityksellesi toimipaikkarakenne.",
    href: "/settings/sites",
  },
  {
    name: "Päästölähteet",
    description:
      "Hiilijalanjälkilaskennan eri päästölähteiden kanssa käytettävät oletuskertoimet voi määrittää tällä asetussivulla.",
    href: "/settings/emission-sources",
  },
  {
    name: "Päästökertoimet",
    description:
      "Voit lisätä omia päästökertoimia tai päivittää yleisen tietokannan kertoimien arvoja.",
    href: "/settings/emission-factors",
  },
]);
