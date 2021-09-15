import { GlobeAltIcon } from "@heroicons/react/outline";
import { HeroIcon, PageLink } from "types/PageLink";

export const linkWithDefaultIcon = (
  link: PageLink
): PageLink & { icon: HeroIcon } => {
  const icon = link.icon || GlobeAltIcon;
  return { ...link, icon: icon };
};

export const linksWithDefaultIcons = (
  links: PageLink[]
): (PageLink & { icon: HeroIcon })[] => {
  return links.map((link) => linkWithDefaultIcon(link));
};
