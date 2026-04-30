import type { QRL, Signal } from "@builder.io/qwik";
import type { CompetitorInfo } from "@/shared/types/benchmark.types";
import type { FeatureValue } from "@/features/home/data/benchmark.data";
import { GROUPED, computeCategoryScore, renderBenchmarkIcon } from "@/features/home/data/benchmark.data";
import { t } from "@/i18n/index";

interface BenchmarkCategoriesProps {
  activeCatId: string;
  expandedCats: Signal<Record<string, boolean>>;
  isVisible: boolean;
  rival: CompetitorInfo;
  stepProgress: number;
  toggleCategory$: QRL<(category: string) => void>;
  translations: Record<string, string>;
}

function renderValue(value: FeatureValue, isSelf: boolean): any {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <span class={`bmk__val-icon ${isSelf ? "bmk__val-icon--yes-self" : "bmk__val-icon--yes"}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
      );
    }
    return (
      <span class={`bmk__val-icon ${isSelf ? "bmk__val-icon--no-self" : "bmk__val-icon--no"}`}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </span>
    );
  }
  return <span class={`bmk__val-text ${isSelf ? "bmk__val-text--self" : ""}`}>{value}</span>;
}

export const BenchmarkCategories = (props: BenchmarkCategoriesProps) => (
  <div class="bmk__categories">
    {GROUPED.map((group, groupIndex) => {
      const isExpanded = props.expandedCats.value[group.category];
      const selfStats = computeCategoryScore("curricanvas", group.category);
      const rivalStats = computeCategoryScore(props.rival.id, group.category);
      const selfPct = (selfStats.score / selfStats.total) * 100;
      const rivalPct = (rivalStats.score / rivalStats.total) * 100;

      return (
        <div key={group.category} id={`bmk-cat-${group.category}`} class={`bmk__category ${isExpanded ? "bmk__category--expanded" : ""}`} style={{ "--group-i": groupIndex } as any}>
          <button class="bmk__cat-head" onClick$={() => props.toggleCategory$(group.category)} aria-expanded={isExpanded}>
            <div class="bmk__cat-info">
              <span class="bmk__cat-icon">{renderBenchmarkIcon(group.category, 18)}</span>
              <span class="bmk__cat-title">{t(props.translations, `benchmark.cat.${group.category}`)}</span>
              <span class="bmk__cat-count">{group.total}</span>
            </div>
            <div class="bmk__cat-bars">
              <div class="bmk__cat-bar-wrap">
                <span class="bmk__cat-bar-label">Us</span>
                <div class="bmk__cat-bar">
                  <div class="bmk__cat-bar-fill bmk__cat-bar-fill--self" style={{ width: `${props.isVisible ? selfPct : 0}%` }} />
                </div>
                <span class="bmk__cat-bar-score">{selfStats.score}/{selfStats.total}</span>
              </div>
              <div class="bmk__cat-bar-wrap">
                <span class="bmk__cat-bar-label">{props.rival.name}</span>
                <div class="bmk__cat-bar">
                  <div class="bmk__cat-bar-fill bmk__cat-bar-fill--comp" style={{ width: `${props.isVisible ? rivalPct : 0}%` }} />
                </div>
                <span class="bmk__cat-bar-score">{rivalStats.score}/{rivalStats.total}</span>
              </div>
            </div>
            <span class={`bmk__cat-chevron ${isExpanded ? "bmk__cat-chevron--open" : ""}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            {props.activeCatId === group.category && (
              <span class="bmk__cat-step-progress" style={{ width: `${props.stepProgress}%` }} aria-hidden="true" />
            )}
          </button>
          <div class="bmk__cat-detail">
            <div class="bmk__cat-features">
              {group.rows.map((row) => (
                <div key={row.feature.id} class="bmk__feature">
                  <span class="bmk__feat-name">
                    {t(props.translations, row.feature.labelKey)}
                    {row.feature.isWeakness && <span class="bmk__feat-weakness">Limit</span>}
                  </span>
                  <div class="bmk__feat-vals">
                    <span class="bmk__feat-val bmk__feat-val--self">{renderValue(row.values.curricanvas, true)}</span>
                    <span class="bmk__feat-val bmk__feat-val--comp">{renderValue(row.values[props.rival.id], false)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
