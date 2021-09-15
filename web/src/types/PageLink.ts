export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

export interface PageLink {
  name: string;
  description: string;
  icon?: HeroIcon;
  href: string;
  disabled?: boolean;
  current?: boolean;
}
