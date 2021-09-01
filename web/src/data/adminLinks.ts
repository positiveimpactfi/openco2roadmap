import { GlobeAltIcon } from "@heroicons/react/outline";

type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

export interface PageLink {
  name: string;
  description: string;
  icon: HeroIcon;
  href: string;
  disabled?: boolean;
}

export const adminLinks: PageLink[] = [
  {
    name: "Yritykset",
    description:
      "Luettelo kaikista laskuria käyttävistä yrityksistä. Voit lisätä uusia yrityksiä, ja muokata yritysten tietoja. Yritysten poistaminen laskurista ei ole tätä kautta mahdollista. ",
    icon: GlobeAltIcon,
    href: "/admin/organizations",
  },
  {
    name: "Päästökertoimet",
    description:
      "Luettelo kaikista laskurin yleisistä päästökertoimista. Voit lisätä, muokata päästökertoimia vapaasti. Muutokset tulevat käyttöön välittömästi kaikille laskurin yrityksille ja käyttäjille. ",
    icon: GlobeAltIcon,
    href: "/admin/emission-factors",
  },
  {
    name: "Käyttäjät",
    description:
      "Luettelo kaikista laskurin käyttäjistä. Voit lisätä, muokata ja poistaa käyttäjiä, sekä antaa näille käyttöoikeuden laskurin eri yrityksiin.",
    icon: GlobeAltIcon,
    href: "/admin/users",
  },
  {
    name: "Tunnusluvut",
    description:
      "Tunnusluvut-osiossa määrittelet, mitä erilaisia tietoja yrityksiltä kysytään ilmastovaikutuksista kertovien hiilijalanjäljen tunnuslukujen laskemiseksi ja yritysten vertailua varten.",
    icon: GlobeAltIcon,
    href: "/admin/kpis",
  },
  {
    name: "Toimipaikkojen asetukset",
    description:
      "Mitä eri toimipaikkatyyppejä ja osastoja laskuri tarjoaa yritysten rajauksen tekemistä varten.",
    icon: GlobeAltIcon,
    href: "/admin/organization-settings",
    disabled: true,
  },
  {
    name: "Vertailuarvot",
    description:
      "Vertailuarvot ovat lukemia, joihin yrityksen hiilijalanjälki suhteutetaan. Nämä tulevat kaikkien laskurin käyttäjien näkyville yrityksen hiilijalanjälkilaskelmien yhteydessä.",
    icon: GlobeAltIcon,
    href: "/admin/comparison",
  },
  {
    name: "Päästölähteet",
    description:
      "Määrittele, mitä päästölähteitä yritykset voivat ottaa mukaan laskentaansa.",
    icon: GlobeAltIcon,
    href: "/admin/emission-sources",
    disabled: true,
  },
  {
    name: "Käyttötilastot",
    description: "(Tulossa myöhemmin)",
    icon: GlobeAltIcon,
    href: "/admin/statistics",
    disabled: true,
  },
];
