import { PageLink } from "types/PageLink";
import { linksWithDefaultIcons } from "utils/linkWithDefaultIcon";

export const adminLinks: PageLink[] = linksWithDefaultIcons([
  {
    name: "Yritykset",
    description:
      "Luettelo kaikista laskuria käyttävistä yrityksistä. Voit lisätä uusia yrityksiä, ja muokata yritysten tietoja. Yritysten poistaminen laskurista ei ole tätä kautta mahdollista. ",
    href: "/admin/organizations",
  },
  {
    name: "Päästökertoimet",
    description:
      "Luettelo kaikista laskurin yleisistä päästökertoimista. Voit lisätä, muokata päästökertoimia vapaasti. Muutokset tulevat käyttöön välittömästi kaikille laskurin yrityksille ja käyttäjille. ",
    href: "/admin/emission-factors",
  },
  {
    name: "Käyttäjät",
    description:
      "Luettelo kaikista laskurin käyttäjistä. Voit lisätä, muokata ja poistaa käyttäjiä, sekä antaa näille käyttöoikeuden laskurin eri yrityksiin.",
    href: "/admin/users",
  },
  {
    name: "Tunnusluvut",
    description:
      "Tunnusluvut-osiossa määrittelet, mitä erilaisia tietoja yrityksiltä kysytään ilmastovaikutuksista kertovien hiilijalanjäljen tunnuslukujen laskemiseksi ja yritysten vertailua varten.",
    href: "/admin/kpis",
    disabled: true,
  },
  {
    name: "Toimipaikkojen asetukset",
    description:
      "Mitä eri toimipaikkatyyppejä ja osastoja laskuri tarjoaa yritysten rajauksen tekemistä varten.",
    href: "/admin/organization-settings",
    disabled: true,
  },
  {
    name: "Vertailuarvot",
    description:
      "Vertailuarvot ovat lukemia, joihin yrityksen hiilijalanjälki suhteutetaan. Nämä tulevat kaikkien laskurin käyttäjien näkyville yrityksen hiilijalanjälkilaskelmien yhteydessä.",
    href: "/admin/comparison",
    disabled: true,
  },
  {
    name: "Päästölähteet",
    description:
      "Määrittele, mitä päästölähteitä yritykset voivat ottaa mukaan laskentaansa.",
    href: "/admin/emission-sources",
    disabled: true,
  },
  {
    name: "Käyttötilastot",
    description: "(Tulossa myöhemmin)",
    href: "/admin/statistics",
    disabled: true,
  },
]);

export const companyAdminLinks = ["/admin/users"];
