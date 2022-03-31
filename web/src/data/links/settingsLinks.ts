import { PageLink } from "types/PageLink";
import { linksWithDefaultIcons } from "utils/linkWithDefaultIcon";

export const settingsLinks: PageLink[] = linksWithDefaultIcons([
  {
    name: "org_settings",
    description: "Yrityksen perustietoja voi muokata tällä sivulla.",
    href: "/settings/organization-settings",
  },
  {
    name: "kpis",
    description: "kpi page",
    href: "/settings/kpi",
  },
  {
    name: "sites",
    description:
      "Ennen laskennan aloittamista luo yrityksellesi toimipaikkarakenne.",
    href: "/settings/sites",
  },
  {
    name: "emission_sources",
    description:
      "Hiilijalanjälkilaskennan eri päästölähteiden kanssa käytettävät oletuskertoimet voi määrittää tällä asetussivulla.",
    href: "/settings/emission-sources",
  },
  {
    name: "emission_factors",
    description:
      "Voit lisätä omia päästökertoimia tai päivittää yleisen tietokannan kertoimien arvoja.",
    href: "/settings/emission-factors",
  },
]);
