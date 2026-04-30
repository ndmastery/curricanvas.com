import { component$, useStyles$, useSignal, useComputed$, $, useOnDocument } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { APP_NAME } from "@/shared/constants/app.constants";
import styles from "@/features/support/presentation/styles/support.css?inline";

const LAST_MODIFIED = "April 20, 2026";

import { FAQ_DATA, totalAll } from "@/features/support/data/support-faq.data";
import { FaqContent } from "@/features/support/presentation/FaqContent";
import { getSearchWords, getSmartSuggestions } from "@/shared/utils/search.utils";

const ALL_WORDS = getSearchWords(FAQ_DATA.flatMap((category) => category.items.map((item) => ({ title: item.question, content: item.answer }))));

export const SupportPage = component$(() => {
  useStyles$(styles);

  const openItems = useSignal<string[]>([]);
  const searchQuery = useSignal("");
  const activeCat = useSignal(FAQ_DATA[0]?.id ?? "");
  const sortOrder = useSignal<"default" | "asc" | "desc">("default");
  const searchFocused = useSignal(false);
  const highlightedIdx = useSignal(-1);
  useOnDocument("keydown", $((e: Event) => {
    const ev = e as KeyboardEvent;
    if ((ev.metaKey || ev.ctrlKey) && ev.key === "k") {
      ev.preventDefault();
      const el = document.getElementById("sup-search-input") as HTMLInputElement | null;
      if (el) { el.focus(); el.select(); }
    }
  }));

  const toggleItem = $((id: string) => {
    if (openItems.value.includes(id)) {
      openItems.value = openItems.value.filter((i) => i !== id);
    } else {
      openItems.value = [...openItems.value, id];
    }
  });

  const clearSearch = $(() => { searchQuery.value = ""; });

  const filteredData = useComputed$(() => {
    const q = searchQuery.value.trim().toLowerCase();
    let data = FAQ_DATA;
    if (q) {
      const terms = q.split(/\s+/).filter(Boolean);
      data = FAQ_DATA.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const haystack = `${item.question} ${item.answer}`.toLowerCase();
          return terms.every((t) => haystack.includes(t));
        }),
      })).filter((cat) => cat.items.length > 0);
    }
    const order = sortOrder.value;
    if (order === "asc") return [...data].sort((a, b) => a.title.localeCompare(b.title));
    if (order === "desc") return [...data].sort((a, b) => b.title.localeCompare(a.title));
    return data;
  });

  const totalResults = useComputed$(() =>
    filteredData.value.reduce((sum, cat) => sum + cat.items.length, 0)
  );
  const autoExpandIds = useComputed$(() => {
    const q = searchQuery.value.trim();
    if (!q) return [] as string[];
    const ids: string[] = [];
    filteredData.value.forEach((cat) => cat.items.forEach((_, idx) => {
      ids.push(`${cat.id}-${idx}`);
    }));
    return ids;
  });

  const updateSearch = $((query: string) => {
    searchQuery.value = query;
  });

  const suggestions = useComputed$(() => {
    const q = searchQuery.value.trim().toLowerCase();
    if (q.length < 2) return [] as { question: string; catTitle: string; catId: string; idx: number }[];
    const results: { question: string; catTitle: string; catId: string; idx: number }[] = [];
    FAQ_DATA.forEach((cat) => cat.items.forEach((item, idx) => {
      if (item.question.toLowerCase().includes(q)) results.push({ question: item.question, catTitle: cat.title, catId: cat.id, idx });
    }));
    return results.slice(0, 6);
  });

  const smartSuggestions = useComputed$(() => {
    const q = searchQuery.value.trim();
    if (!q || filteredData.value.length > 0) return [] as string[];
    return getSmartSuggestions(q, ALL_WORDS);
  });

  return (
    <div class="sup">
      <div class="sup__mesh" aria-hidden="true" />
      <div class="sup__grain" aria-hidden="true" />

      <div class="sup__wrap">
        <header class="sup__header">
          <div class="sup__toprow">
            <Link href="/" class="sup__back">
              <span class="sup__back-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </span>
              Back to Home
            </Link>
            <span class="sup__eyebrow">
              <span class="sup__eyebrow-dot" aria-hidden="true" />
              Help Center
            </span>
          </div>

          <h1 class="sup__title">Support</h1>
          <p class="sup__subtitle">
            Find answers to common questions about {APP_NAME} — from account setup and the resume editor to exports, credits, and integrations.
          </p>
          <p class="sup__meta">
            <span class="sup__meta-dot" aria-hidden="true" />
            Last updated {LAST_MODIFIED} · {searchQuery.value.trim()
              ? `${totalResults.value} result${totalResults.value !== 1 ? "s" : ""} found`
              : `${totalAll} answers across ${FAQ_DATA.length} categories`}
          </p>
        </header>
        <div class="sup__s" data-focused={searchFocused.value || undefined}>
          <div class="sup__s-bar">
            <span class="sup__s-scope" aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              FAQ
            </span>
            <input
              type="text"
              class="sup__s-input"
              placeholder="Search questions and answers…"
              aria-label="Search FAQ"
              id="sup-search-input"
              autoComplete="off"
              bind:value={searchQuery}
              onFocus$={() => { searchFocused.value = true; highlightedIdx.value = -1; }}
              onBlur$={() => { setTimeout(() => { searchFocused.value = false; }, 200); }}
              onKeyDown$={(e: KeyboardEvent) => {
                const sugs = suggestions.value;
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  highlightedIdx.value = sugs.length ? (highlightedIdx.value + 1) % sugs.length : -1;
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  highlightedIdx.value = sugs.length ? (highlightedIdx.value - 1 + sugs.length) % sugs.length : -1;
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  if (highlightedIdx.value >= 0 && sugs[highlightedIdx.value]) {
                    const s = sugs[highlightedIdx.value];
                    searchQuery.value = s.question;
                    openItems.value = [...openItems.value, `${s.catId}-${s.idx}`];
                    activeCat.value = s.catId;
                    setTimeout(() => {
                      const el = document.getElementById(`cat-${s.catId}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }
                  searchFocused.value = false;
                  highlightedIdx.value = -1;
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  if (searchQuery.value.trim()) { searchQuery.value = ""; }
                  searchFocused.value = false;
                  highlightedIdx.value = -1;
                  (e.target as HTMLInputElement)?.blur();
                } else if (e.key === "Tab") {
                  searchFocused.value = false;
                  highlightedIdx.value = -1;
                }
              }}
            />
            {!searchQuery.value.trim() && !searchFocused.value && (
              <kbd class="sup__s-hint">⌘K</kbd>
            )}
            {searchQuery.value.trim() && (
              <button class="sup__s-clear" onClick$={clearSearch} aria-label="Clear search" type="button">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
            {searchFocused.value && suggestions.value.length > 0 && (
              <div class="sup__cmd" role="listbox" aria-label="Search suggestions">
                <div class="sup__cmd-head">
                  <span class="sup__cmd-label">Quick results</span>
                  <span class="sup__cmd-count">{suggestions.value.length}</span>
                  <span class="sup__cmd-keys">
                    <kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> select
                  </span>
                </div>
                {suggestions.value.map((s, i) => {
                  const cat = FAQ_DATA.find(c => c.id === s.catId);
                  return (
                    <button
                      key={i}
                      class={`sup__cmd-row${highlightedIdx.value === i ? " sup__cmd-row--active" : ""}`}
                      type="button"
                      role="option"
                      aria-selected={highlightedIdx.value === i}
                      onMouseEnter$={() => { highlightedIdx.value = i; }}
                      onClick$={() => {
                        searchQuery.value = s.question;
                        searchFocused.value = false;
                        highlightedIdx.value = -1;
                        openItems.value = [...openItems.value, `${s.catId}-${s.idx}`];
                        activeCat.value = s.catId;
                        setTimeout(() => {
                          const el = document.getElementById(`cat-${s.catId}`);
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 100);
                      }}
                    >
                      <span class="sup__cmd-ico">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={cat?.icon ?? "M9 5l7 7-7 7"}/></svg>
                      </span>
                      <span class="sup__cmd-q">{s.question}</span>
                      <span class="sup__cmd-cat">{s.catTitle}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sup__cmd-arrow"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  );
                })}
                <div class="sup__cmd-foot">
                  <kbd>Esc</kbd> close
                </div>
              </div>
            )}
          </div>
          {searchQuery.value.trim() && (
            <div class="sup__s-toolbar">
              <span class="sup__s-stats">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                {filteredData.value.length} categor{filteredData.value.length !== 1 ? "ies" : "y"} · {totalResults.value} result{totalResults.value !== 1 ? "s" : ""}
              </span>
              <div class="sup__s-sorts">
                <button class={`sup__s-sort${sortOrder.value === "asc" ? " sup__s-sort--on" : ""}`} type="button" aria-label="Sort A to Z" onClick$={() => { sortOrder.value = sortOrder.value === "asc" ? "default" : "asc"; }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                  A–Z
                </button>
                <button class={`sup__s-sort${sortOrder.value === "desc" ? " sup__s-sort--on" : ""}`} type="button" aria-label="Sort Z to A" onClick$={() => { sortOrder.value = sortOrder.value === "desc" ? "default" : "desc"; }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                  Z–A
                </button>
              </div>
            </div>
          )}
        </div>
        <FaqContent
          activeCat={activeCat}
          autoExpandIds={autoExpandIds.value}
          clearSearch$={clearSearch}
          data={filteredData.value}
          hasSearchQuery={!!searchQuery.value.trim()}
          openItemIds={openItems.value}
          query={searchQuery.value}
          smartSuggestions={smartSuggestions.value}
          toggleItem$={toggleItem}
          updateSearch$={updateSearch}
        />
        <div class="sup__contact" aria-disabled="true">
          <span class="sup__contact-badge">Coming Soon</span>
          <div class="sup__contact-row">
            <div class="sup__contact-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="sup__contact-body">
              <h2 class="sup__contact-title">Contact Support</h2>
              <p class="sup__contact-desc">
                Our dedicated support portal will allow you to submit tickets, track issue status, and get direct assistance from the {APP_NAME} team.
              </p>
            </div>
          </div>
        </div>
        <div class="sup__footer">
          <button class="sup__footer-link" onClick$={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span class="sup__footer-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            </span>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
});
