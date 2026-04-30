import type { BenchmarkFeature, CompetitorInfo, BenchmarkCategory } from "@/shared/types/benchmark.types";

export const BENCHMARK_COMPETITORS: CompetitorInfo[] = [
  { id: "curricanvas", name: "CurriCanvas", url: "https://curricanvas.com", isSelf: true },
  { id: "resumeio", name: "Resume.io", url: "https://resume.io" },
  { id: "zety", name: "Zety", url: "https://zety.com" },
  { id: "canva", name: "Canva", url: "https://canva.com" },
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com" },
  { id: "kickresume", name: "Kickresume", url: "https://kickresume.com" },
];

export const RIVALS = BENCHMARK_COMPETITORS.filter((c) => !c.isSelf);

export type FeatureValue = boolean | string | "partial" | "coming-soon";

export const BENCHMARK_DATA: Array<{
  feature: BenchmarkFeature;
  values: Record<string, FeatureValue>;
}> = [
  { feature: { id: "ats", labelKey: "benchmark.feat.ats", category: "export" }, values: { curricanvas: true, resumeio: true, zety: true, canva: false, linkedin: true, kickresume: true } },
  { feature: { id: "ai_import", labelKey: "benchmark.feat.ai_import", category: "ai" }, values: { curricanvas: true, resumeio: false, zety: false, canva: false, linkedin: false, kickresume: false } },
  { feature: { id: "markdown", labelKey: "benchmark.feat.markdown", category: "editor" }, values: { curricanvas: true, resumeio: false, zety: false, canva: false, linkedin: false, kickresume: false } },
  { feature: { id: "share_link", labelKey: "benchmark.feat.share_link", category: "sharing" }, values: { curricanvas: true, resumeio: false, zety: false, canva: false, linkedin: false, kickresume: true } },
  { feature: { id: "view_tracking", labelKey: "benchmark.feat.view_tracking", category: "sharing" }, values: { curricanvas: true, resumeio: false, zety: false, canva: false, linkedin: false, kickresume: false } },
  { feature: { id: "repo_import", labelKey: "benchmark.feat.repo_import", category: "integrations" }, values: { curricanvas: true, resumeio: false, zety: false, canva: false, linkedin: false, kickresume: false } },
  { feature: { id: "pdf", labelKey: "benchmark.feat.pdf", category: "export" }, values: { curricanvas: true, resumeio: true, zety: true, canva: true, linkedin: true, kickresume: true } },
  { feature: { id: "png", labelKey: "benchmark.feat.png", category: "export" }, values: { curricanvas: true, resumeio: false, zety: false, canva: true, linkedin: false, kickresume: false } },
  { feature: { id: "docx", labelKey: "benchmark.feat.docx", category: "export" }, values: { curricanvas: true, resumeio: true, zety: true, canva: false, linkedin: false, kickresume: true } },
  { feature: { id: "theme_export", labelKey: "benchmark.feat.theme_export", category: "export" }, values: { curricanvas: true, resumeio: false, zety: false, canva: false, linkedin: false, kickresume: false } },
  { feature: { id: "custom_domain", labelKey: "benchmark.feat.custom_domain", category: "sharing" }, values: { curricanvas: true, resumeio: false, zety: false, canva: false, linkedin: false, kickresume: false } },
  { feature: { id: "free_tier", labelKey: "benchmark.feat.free_tier", category: "plans" }, values: { curricanvas: true, resumeio: false, zety: false, canva: true, linkedin: true, kickresume: false } },
  { feature: { id: "contact_platforms", labelKey: "benchmark.feat.contact_platforms", category: "editor" }, values: { curricanvas: true, resumeio: false, zety: false, canva: false, linkedin: false, kickresume: false } },
  { feature: { id: "draft_autosave", labelKey: "benchmark.feat.draft_autosave", category: "editor" }, values: { curricanvas: true, resumeio: true, zety: true, canva: true, linkedin: true, kickresume: true } },
  { feature: { id: "trash_restore", labelKey: "benchmark.feat.trash_restore", category: "editor" }, values: { curricanvas: true, resumeio: false, zety: false, canva: false, linkedin: false, kickresume: false } },
  { feature: { id: "templates", labelKey: "benchmark.feat.templates", category: "templates", isWeakness: true }, values: { curricanvas: "2", resumeio: "40+", zety: "35+", canva: "100+", linkedin: "5", kickresume: "35+" } },
  { feature: { id: "cover_letter", labelKey: "benchmark.feat.cover_letter", category: "templates", isWeakness: true }, values: { curricanvas: false, resumeio: true, zety: true, canva: true, linkedin: false, kickresume: true } },
  { feature: { id: "job_board", labelKey: "benchmark.feat.job_board", category: "integrations", isWeakness: true }, values: { curricanvas: false, resumeio: false, zety: true, canva: false, linkedin: true, kickresume: true } },
  { feature: { id: "multi_oauth", labelKey: "benchmark.feat.multi_oauth", category: "integrations" }, values: { curricanvas: true, resumeio: false, zety: false, canva: true, linkedin: true, kickresume: false } },
];

export const totalFeatures = BENCHMARK_DATA.length;

export function computeScore(compId: string): number {
  return BENCHMARK_DATA.filter((row) => row.values[compId] === true).length;
}

export const CATEGORY_ORDER: BenchmarkCategory[] = [
  "ai",
  "export",
  "editor",
  "sharing",
  "integrations",
  "plans",
  "templates",
];

function groupByCategory() {
  const groups: Array<{
    category: BenchmarkCategory;
    rows: typeof BENCHMARK_DATA;
    total: number;
  }> = [];
  for (const cat of CATEGORY_ORDER) {
    const rows = BENCHMARK_DATA.filter((r) => r.feature.category === cat);
    if (rows.length > 0) {
      groups.push({ category: cat, rows, total: rows.length });
    }
  }
  return groups;
}

export const GROUPED = groupByCategory();

export function computeCategoryScore(compId: string, category: BenchmarkCategory) {
  const rows = BENCHMARK_DATA.filter((r) => r.feature.category === category);
  const score = rows.filter((r) => r.values[compId] === true).length;
  return { score, total: rows.length };
}

const BENCHMARK_ICONS = {
  ai: "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z",
  export: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8",
  editor: "M12 20h9|M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  sharing: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71|M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  integrations: "M12 12a10 10 0 1 1 0-20 10 10 0 0 1 0 20z|M2 12h20|M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  plans: "M20 12v10H4V12|M2 7h20v5H2z|M12 22V7|M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z|M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z",
  templates: "M3 3h18v18H3z|M8.5 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z|M21 15l-5-5L5 21",
};

export const renderBenchmarkIcon = (name: BenchmarkCategory, size = 18) => {
  const paths = (BENCHMARK_ICONS[name] || "").split("|");
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
};

export const GAUGE_R = 54;
export const GAUGE_C = 2 * Math.PI * GAUGE_R; 

export const STEP_HOLD_MS = 4000; 
export const STEP_TRANSITION_MS = 600; 
export const RIVAL_PAUSE_MS = 1200;
