import { PageLink } from "types/PageLink";
import { linksWithDefaultIcons } from "utils/linkWithDefaultIcon";

export const calculatorLinks: PageLink[] = linksWithDefaultIcons([
  {
    name: "consumption_data",
    description:
      "Hiilijalanjäljen laskeminen perustuu yrityksesi todellisiin kulutustietoihin. Saat nämä mm. energiayhtiöiltä, ajopäiväkirjoista ja kirjanpidosta. sivun kautta syötät energian, jätteiden, hankintojen ja hallinnon eri kulutustiedot, kuukausi- tai vuositasolla.",
    href: "/calculator/consumption-data",
  },
  {
    name: "footprints",
    description:
      "Päästölaskennan yhteenvedot muodostetaan hiilijalanjäljet-sivulla.",
    href: "/calculator/footprints",
  },
]);
