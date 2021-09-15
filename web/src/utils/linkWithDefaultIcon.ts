import { GlobeAltIcon } from "@heroicons/react/outline";
import { HeroIcon, PageLink } from "types/PageLink";

export const linkWithDefaultIcon = (
  link: PageLink
): PageLink & { icon: HeroIcon } => {
  return { ...link, icon: link.icon || GlobeAltIcon };
};

export const linksWithDefaultIcons = (
  links: PageLink[]
): (PageLink & { icon: HeroIcon })[] => {
  return links.map((link) => linkWithDefaultIcon(link));
};
