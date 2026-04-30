import { component$, type PropFunction } from "@builder.io/qwik";

interface LegalEmptyStateProps {
  classPrefix: "ppg" | "tos";
  query: string;
  smartSuggestions: string[];
  onClear$: PropFunction<() => void>;
  onSelectSuggestion$: PropFunction<(word: string) => void>;
}

export const LegalEmptyState = component$((props: LegalEmptyStateProps) => {
  const prefix = props.classPrefix;

  return (
    <div class={`${prefix}__nil`}>
      <div class={`${prefix}__nil-dots`} aria-hidden="true" />
      <div class={`${prefix}__nil-ring`}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </div>
      <h3 class={`${prefix}__nil-title`}>No results for <span class={`${prefix}__nil-q`}>"{props.query}"</span></h3>
      <p class={`${prefix}__nil-desc`}>We couldn't find any {prefix === "tos" ? "terms" : "policy sections"} matching your query. Try a different term or reset the search.</p>
      <button class={`${prefix}__nil-reset`} onClick$={props.onClear$} type="button">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
        Reset search
      </button>
      {props.smartSuggestions.length > 0 && (
        <div class={`${prefix}__nil-sug`}>
          <p class={`${prefix}__nil-sug-label`}>Try these instead</p>
          <div class={`${prefix}__nil-sug-list`}>
            {props.smartSuggestions.map((word) => (
              <button key={word} class={`${prefix}__nil-chip`} onClick$={() => props.onSelectSuggestion$(word)} type="button">
                {word}
                <svg class={`${prefix}__nil-chip-arrow`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
