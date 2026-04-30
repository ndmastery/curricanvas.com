import { component$, type PropFunction, type Signal } from "@builder.io/qwik";
import { FAQ_DATA, type FAQCategory } from "@/features/support/data/support-faq.data";
import { formatNumberIndex } from "@/shared/utils/search.utils";

interface FaqContentProps {
  activeCat: Signal<string>;
  autoExpandIds: string[];
  clearSearch$: PropFunction<() => void>;
  data: FAQCategory[];
  hasSearchQuery: boolean;
  openItemIds: string[];
  query: string;
  smartSuggestions: string[];
  toggleItem$: PropFunction<(itemId: string) => void>;
  updateSearch$: PropFunction<(query: string) => void>;
}

const getOriginalIndex = (catId: string) => formatNumberIndex(FAQ_DATA.findIndex((category) => category.id === catId));

const highlight = (text: string, query: string) => {
  const trimmed = query.trim();
  if (trimmed.length < 2) return text;
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matcher = new RegExp(`^${escaped}$`, "i");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.length <= 1 ? text : parts.map((part, index) => (
    matcher.test(part) ? <mark key={index} class="sup__mark">{part}</mark> : part
  ));
};

export const FaqContent = component$((props: FaqContentProps) => {
  if (props.data.length === 0) {
    return (
      <div class="sup__nil">
        <div class="sup__nil-dots" aria-hidden="true" />
        <div class="sup__nil-ring" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
        <h3 class="sup__nil-title">No results for <span class="sup__nil-q">"{props.query.trim()}"</span></h3>
        <p class="sup__nil-desc">We couldn't find any questions or answers matching your query. Try a different keyword or check your spelling.</p>
        <button class="sup__nil-reset" onClick$={props.clearSearch$} type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Reset search
        </button>
        {props.smartSuggestions.length > 0 && (
          <div class="sup__nil-sug">
            <span class="sup__nil-sug-label">Try these instead</span>
            <div class="sup__nil-sug-list">
              {props.smartSuggestions.map((word) => (
                <button key={word} class="sup__nil-chip" type="button" onClick$={() => props.updateSearch$(word)}>
                  {word}
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="sup__nil-chip-arrow"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div class="sup__duo">
      <nav class="sup__nav" aria-label="FAQ Categories">
        <span class="sup__nav-label">Categories</span>
        {props.data.map((cat) => (
          <button key={cat.id} class={`sup__nav-item${props.activeCat.value === cat.id ? " sup__nav-item--active" : ""}`} onClick$={() => {
            props.activeCat.value = cat.id;
            document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            {cat.title}
            <span class="sup__nav-count">{cat.items.length}</span>
          </button>
        ))}
      </nav>
      <div class="sup__divider" aria-hidden="true" />
      <div class="sup__pane">
        {props.data.map((category) => (
          <div key={category.id} id={`cat-${category.id}`} class="sup__cat">
            <div class="sup__cat-header">
              <span class="sup__cat-num">{getOriginalIndex(category.id)}</span>
              <div class="sup__cat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={category.icon}/></svg>
              </div>
              <h3 class="sup__cat-title">{category.title}</h3>
              <span class="sup__cat-count">{category.items.length}</span>
            </div>
            {category.items.map((item, index) => {
              const itemId = `${category.id}-${index}`;
              const isOpen = props.hasSearchQuery ? props.autoExpandIds.includes(itemId) : props.openItemIds.includes(itemId);
              return (
                <div key={itemId} class={`sup__faq${isOpen ? " sup__faq--open" : ""}`}>
                  <button class="sup__faq-trigger" onClick$={() => props.toggleItem$(itemId)} aria-expanded={isOpen} aria-controls={`faq-a-${itemId}`}>
                    <span class="sup__faq-q">{highlight(item.question, props.query)}</span>
                    <span class="sup__faq-chev">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                  </button>
                  <div class="sup__faq-body" id={`faq-a-${itemId}`} role="region">
                    <div class="sup__faq-body-inner">
                      <p class="sup__faq-answer">{highlight(item.answer, props.query)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});
