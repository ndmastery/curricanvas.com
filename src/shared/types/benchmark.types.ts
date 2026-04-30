export type BenchmarkValue =
  | boolean
  | string
  | "partial"
  | "coming-soon";

export interface BenchmarkFeature {
  id: string;
  labelKey: string;
  category: BenchmarkCategory;
  isWeakness?: boolean;
}

export type BenchmarkCategory =
  | "export"
  | "ai"
  | "sharing"
  | "editor"
  | "integrations"
  | "plans"
  | "templates";

export interface CompetitorInfo {
  id: string;
  name: string;
  url: string;
  isSelf?: boolean;
}

export type BenchmarkRow = {
  featureId: string;
  values: Record<string, BenchmarkValue>;
};
