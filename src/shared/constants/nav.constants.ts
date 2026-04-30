import type { NavItem, FooterColumn } from "@/shared/types/navigation.types";

export const NAV_ITEMS: NavItem[] = [
  { id: "challenges", labelKey: "nav.challenges", href: "/#challenges" },
  { id: "capabilities", labelKey: "nav.capabilities", href: "/#capabilities" },
  { id: "benchmark", labelKey: "nav.benchmark", href: "/#benchmark" },
  { id: "workflow", labelKey: "nav.workflow", href: "/#workflow" },
  { id: "plans", labelKey: "nav.plans", href: "/#plans" },
  { id: "platforms", labelKey: "nav.platforms", href: "/#platforms" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    titleKey: "footer.explore",
    links: [
      { labelKey: "nav.challenges", href: "/#challenges" },
      { labelKey: "nav.capabilities", href: "/#capabilities" },
      { labelKey: "nav.benchmark", href: "/#benchmark" },
      { labelKey: "nav.workflow", href: "/#workflow" },
      { labelKey: "nav.plans", href: "/#plans" },
      { labelKey: "nav.platforms", href: "/#platforms" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      { labelKey: "footer.privacy", href: "/privacy-policy", isExternal: false },
      { labelKey: "footer.terms", href: "/terms-of-service", isExternal: false },
      { labelKey: "footer.changelog", href: "/changelog", isExternal: false },
      { labelKey: "footer.support", href: "/support", isExternal: false },
    ],
  },
  {
    titleKey: "footer.apps",
    links: [
      { labelKey: "footer.webApp", href: "https://web.curricanvas.com", isExternal: true },
      { labelKey: "footer.android", href: "/#platforms", isDisabled: true },
      { labelKey: "footer.ios", href: "/#platforms", isDisabled: true },
      { labelKey: "footer.windows", href: "/#platforms", isDisabled: true },
      { labelKey: "footer.macos", href: "/#platforms", isDisabled: true },
      { labelKey: "footer.linux", href: "/#platforms", isDisabled: true },
    ],
  },
];
