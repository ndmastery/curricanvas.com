export type TabId = "ai" | "export" | "editor" | "integrations" | "credit" | "privacy" | "themes";

export interface CapabilityItem {
  titleKey: string;
  descKey: string;
  icon: string;
  exclusive?: boolean;
}

const ICON_PATHS: Record<string, string> = {
  ai: "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z",
  sparkle: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z",
  pdf: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8",
  image: "M3 3h18v18H3z|M8.5 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z|M21 15l-5-5L5 21",
  docx: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8",
  zip: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  ats: "M22 3H2l8 9.46V19l4 2V12.46z",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71|M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z|M12 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
  chart: "M18 20V10|M12 20V4|M6 20v-6",
  edit: "M12 20h9|M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  list: "M8 6h13|M8 12h13|M8 18h13|M3 6h.01|M3 12h.01|M3 18h.01",
  globe: "M12 12a10 10 0 1 1 0-20 10 10 0 0 1 0 20z|M2 12h20|M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  shuffle: "M16 3h5v5|M4 20L21 3|M21 16v5h-5|M15 15l6 6|M4 4l5 5",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z|M17 21v-8H7v8|M7 3v5h8",
  trash: "M3 6h18|M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  lock: "M3 11h18v11H3z|M7 11V7a5 5 0 0 1 10 0v4",
  key: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4",
  gift: "M20 12v10H4V12|M2 7h20v5H2z|M12 22V7|M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z|M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z",
  credit: "M1 4h22v16H1z|M1 10h22",
  history: "M1 4v6h6|M3.51 15a9 9 0 1 0 .49-3.1",
  domain: "M2 3h20v14H2z|M8 21h8|M12 17v4",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  sun: "M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z|M12 1v2|M12 21v2|M4.22 4.22l1.42 1.42|M18.36 18.36l1.42 1.42|M1 12h2|M21 12h2|M4.22 19.78l1.42-1.42|M18.36 5.64l1.42-1.42",
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  amoled: "M2 2h20v20H2z",
  bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  chevron: "M6 9l6 6 6-6",
};

const FILLED_ICONS: Record<string, string> = {
  github: "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z",
  gitlab: "M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.92z",
  bitbucket: "M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z",
};

export const renderCapabilityIcon = (name: string, size = 20) => {
  if (FILLED_ICONS[name]) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={FILLED_ICONS[name]} />
      </svg>
    );
  }
  const paths = (ICON_PATHS[name] || "").split("|");
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
};

const CAPABILITIES: Record<TabId, CapabilityItem[]> = {
  ai: [
    { titleKey: "capabilities.ai.import.title", descKey: "capabilities.ai.import.desc", icon: "ai", exclusive: true },
    { titleKey: "capabilities.ai.save.title", descKey: "capabilities.ai.save.desc", icon: "sparkle", exclusive: true },
  ],
  export: [
    { titleKey: "capabilities.export.pdf.title", descKey: "capabilities.export.pdf.desc", icon: "pdf" },
    { titleKey: "capabilities.export.png.title", descKey: "capabilities.export.png.desc", icon: "image" },
    { titleKey: "capabilities.export.docx.title", descKey: "capabilities.export.docx.desc", icon: "docx" },
    { titleKey: "capabilities.export.zip.title", descKey: "capabilities.export.zip.desc", icon: "zip" },
    { titleKey: "capabilities.export.ats.title", descKey: "capabilities.export.ats.desc", icon: "ats" },
    { titleKey: "capabilities.share.link.title", descKey: "capabilities.share.link.desc", icon: "link", exclusive: true },
    { titleKey: "capabilities.share.views.title", descKey: "capabilities.share.views.desc", icon: "eye", exclusive: true },
    { titleKey: "capabilities.share.downloads.title", descKey: "capabilities.share.downloads.desc", icon: "chart", exclusive: true },
  ],
  editor: [
    { titleKey: "capabilities.editor.markdown.title", descKey: "capabilities.editor.markdown.desc", icon: "edit", exclusive: true },
    { titleKey: "capabilities.editor.sections.title", descKey: "capabilities.editor.sections.desc", icon: "list" },
    { titleKey: "capabilities.editor.platforms.title", descKey: "capabilities.editor.platforms.desc", icon: "globe", exclusive: true },
    { titleKey: "capabilities.editor.order.title", descKey: "capabilities.editor.order.desc", icon: "shuffle" },
    { titleKey: "capabilities.editor.draft.title", descKey: "capabilities.editor.draft.desc", icon: "save" },
    { titleKey: "capabilities.editor.trash.title", descKey: "capabilities.editor.trash.desc", icon: "trash", exclusive: true },
  ],
  integrations: [
    { titleKey: "capabilities.integrations.github.title", descKey: "capabilities.integrations.github.desc", icon: "github", exclusive: true },
    { titleKey: "capabilities.integrations.gitlab.title", descKey: "capabilities.integrations.gitlab.desc", icon: "gitlab", exclusive: true },
    { titleKey: "capabilities.integrations.bitbucket.title", descKey: "capabilities.integrations.bitbucket.desc", icon: "bitbucket", exclusive: true },
    { titleKey: "capabilities.integrations.oauth.title", descKey: "capabilities.integrations.oauth.desc", icon: "key" },
  ],
  credit: [
    { titleKey: "capabilities.credit.free.title", descKey: "capabilities.credit.free.desc", icon: "gift" },
    { titleKey: "capabilities.credit.topup.title", descKey: "capabilities.credit.topup.desc", icon: "credit" },
    { titleKey: "capabilities.credit.history.title", descKey: "capabilities.credit.history.desc", icon: "history" },
  ],
  privacy: [
    { titleKey: "capabilities.privacy.domain.title", descKey: "capabilities.privacy.domain.desc", icon: "domain", exclusive: true },
    { titleKey: "capabilities.privacy.rls.title", descKey: "capabilities.privacy.rls.desc", icon: "shield" },
  ],
  themes: [
    { titleKey: "capabilities.themes.light.title", descKey: "capabilities.themes.light.desc", icon: "sun" },
    { titleKey: "capabilities.themes.dark.title", descKey: "capabilities.themes.dark.desc", icon: "moon" },
    { titleKey: "capabilities.themes.amoled.title", descKey: "capabilities.themes.amoled.desc", icon: "amoled", exclusive: true },
  ],
};

export const CAPABILITY_TABS: Array<{ id: TabId; labelKey: string; icon: string }> = [
  { id: "ai", labelKey: "capabilities.tab.ai", icon: "ai" },
  { id: "export", labelKey: "capabilities.tab.export", icon: "pdf" },
  { id: "editor", labelKey: "capabilities.tab.editor", icon: "edit" },
  { id: "integrations", labelKey: "capabilities.tab.integrations", icon: "globe" },
  { id: "credit", labelKey: "capabilities.tab.credit", icon: "credit" },
  { id: "privacy", labelKey: "capabilities.tab.privacy", icon: "shield" },
  { id: "themes", labelKey: "capabilities.tab.themes", icon: "sun" },
];

const sortExclusiveFirst = (items: CapabilityItem[]): CapabilityItem[] => {
  const exclusive = items.filter(i => i.exclusive);
  const standard = items.filter(i => !i.exclusive);
  return [...exclusive, ...standard];
};

const _sortedItems: Partial<Record<TabId, CapabilityItem[]>> = {};
const _tabDurations: Partial<Record<TabId, number>> = {};

for (const tab of CAPABILITY_TABS) {
  _sortedItems[tab.id] = sortExclusiveFirst(CAPABILITIES[tab.id]);

  const count = CAPABILITIES[tab.id].length;
  _tabDurations[tab.id] = Math.min(Math.max(5000 + count * 1500, 7000), 18000);
}

export const SORTED_CAPABILITY_ITEMS = _sortedItems as Record<TabId, CapabilityItem[]>;
export const CAPABILITY_TAB_DURATION_MS = _tabDurations as Record<TabId, number>;

