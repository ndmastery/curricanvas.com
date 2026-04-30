export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
  isExternal?: boolean;
  isDisabled?: boolean;
}

export interface FooterColumn {
  titleKey: string;
  links: FooterLink[];
}

export interface FooterLink {
  labelKey: string;
  href: string;
  isExternal?: boolean;
  isDisabled?: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}
