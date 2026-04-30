import { $, component$, useComputed$, useOnDocument, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { LegalSection } from "@/features/legal/types/legal.types";
import { EmptyState } from "@/features/legal/presentation/EmptyState";
import { highlightLegalText, renderLegalContent } from "@/features/legal/presentation/RichText";
import { formatNumberIndex, getSearchWords, getSmartSuggestions, matchesSearchTerms } from "@/shared/utils/search.utils";

interface DocumentPageProps {
  classPrefix: "ppg" | "tos";
  effectiveDate: string;
  intro: string;
  introWebAppUrl: string;
  pageTitle: string;
  scopeLabel: string;
  searchInputId: string;
  searchLabel: string;
  searchPlaceholder: string;
  sections: LegalSection[];
  supportDescription: string;
}

export const DocumentPage = component$((props: DocumentPageProps) => {
  const expandedId = useSignal(props.sections[0]?.id ?? "");
  const searchQuery = useSignal("");
  const searchFocused = useSignal(false);
  const highlightedIndex = useSignal(-1);
  const hasSearched = useSignal(false);
  const searchWords = getSearchWords(props.sections);

  const clearSearch = $(() => {
    searchQuery.value = "";
  });

  const toggleSection = $((id: string) => {
    expandedId.value = expandedId.value === id ? "" : id;
  });

  useOnDocument("keydown", $((event: Event) => {
    const keyboardEvent = event as KeyboardEvent;
    if ((keyboardEvent.metaKey || keyboardEvent.ctrlKey) && keyboardEvent.key === "k") {
      keyboardEvent.preventDefault();
      const input = document.getElementById(props.searchInputId) as HTMLInputElement | null;
      if (input) {
        input.focus();
        input.select();
      }
    }
  }));

  const filteredSections = useComputed$(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return props.sections;
    hasSearched.value = true;
    return props.sections.filter((section) => matchesSearchTerms(`${section.title} ${section.content}`, query));
  });

  const suggestions = useComputed$(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (query.length < 2) return [];
    return props.sections
      .filter((section) => section.title.toLowerCase().includes(query) || section.content.toLowerCase().includes(query))
      .slice(0, 6)
      .map((section) => ({ title: section.title, id: section.id }));
  });

  const smartSuggestions = useComputed$(() => {
    const query = searchQuery.value.trim();
    if (!query || filteredSections.value.length > 0) return [];
    return getSmartSuggestions(query, searchWords);
  });

  useVisibleTask$(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!elements.length) return;
    if (reduced) {
      elements.forEach((element) => {
        element.dataset.reveal = "visible";
      });
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.reveal = "visible";
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  });

  const prefix = props.classPrefix;

  return (
    <div class={prefix}>
      <div class={`${prefix}__mesh`} aria-hidden="true" />
      <div class={`${prefix}__grain`} aria-hidden="true" />
      <div class={`${prefix}__wrap`}>
        <header class={`${prefix}__header`}>
          <div class={`${prefix}__toprow`}>
            <Link href="/" class={`${prefix}__back`}>
              <span class={`${prefix}__back-icon`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
              </span>
              Back to Home
            </Link>
            <span class={`${prefix}__eyebrow`}>
              <span class={`${prefix}__eyebrow-dot`} aria-hidden="true" />
              Legal
            </span>
          </div>
          <h1 class={`${prefix}__title`}>{props.pageTitle}</h1>
          <p class={`${prefix}__effective`}>
            <span class={`${prefix}__effective-dot`} aria-hidden="true" />
            Effective Date: {props.effectiveDate}
          </p>
          <p class={`${prefix}__intro`}>
            <span dangerouslySetInnerHTML={props.intro} />{" "}
            <a href={props.introWebAppUrl} target="_blank" rel="noopener noreferrer">web.curricanvas.com</a>.
          </p>
        </header>
        <div class={`${prefix}__s`} data-focused={searchFocused.value || undefined}>
          <div class={`${prefix}__s-bar`}>
            <span class={`${prefix}__s-scope`} aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              {props.scopeLabel}
            </span>
            <input
              type="text"
              class={`${prefix}__s-input`}
              placeholder={props.searchPlaceholder}
              aria-label={props.searchLabel}
              id={props.searchInputId}
              autoComplete="off"
              bind:value={searchQuery}
              onFocus$={() => {
                searchFocused.value = true;
                highlightedIndex.value = -1;
              }}
              onBlur$={() => {
                setTimeout(() => {
                  searchFocused.value = false;
                }, 200);
              }}
              onKeyDown$={(event: KeyboardEvent) => {
                const rows = suggestions.value;
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  highlightedIndex.value = rows.length ? (highlightedIndex.value + 1) % rows.length : -1;
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  highlightedIndex.value = rows.length ? (highlightedIndex.value - 1 + rows.length) % rows.length : -1;
                } else if (event.key === "Enter") {
                  event.preventDefault();
                  const selected = rows[highlightedIndex.value];
                  if (selected) {
                    searchQuery.value = selected.title;
                    expandedId.value = selected.id;
                    setTimeout(() => document.getElementById(selected.id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
                  }
                  searchFocused.value = false;
                  highlightedIndex.value = -1;
                } else if (event.key === "Escape") {
                  event.preventDefault();
                  if (searchQuery.value.trim()) searchQuery.value = "";
                  searchFocused.value = false;
                  highlightedIndex.value = -1;
                  (event.target as HTMLInputElement)?.blur();
                } else if (event.key === "Tab") {
                  searchFocused.value = false;
                  highlightedIndex.value = -1;
                }
              }}
            />
            {!searchQuery.value.trim() && !searchFocused.value && <kbd class={`${prefix}__s-hint`}>⌘K</kbd>}
            {searchQuery.value.trim() && (
              <button class={`${prefix}__s-clear`} onClick$={clearSearch} aria-label="Clear search" type="button">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
            {searchFocused.value && suggestions.value.length > 0 && (
              <div class={`${prefix}__cmd`} role="listbox">
                <div class={`${prefix}__cmd-head`}>
                  <span class={`${prefix}__cmd-label`}>Quick results</span>
                  <span class={`${prefix}__cmd-count`}>{suggestions.value.length}</span>
                  <span class={`${prefix}__cmd-keys`}><kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> select</span>
                </div>
                {suggestions.value.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    class={`${prefix}__cmd-row${highlightedIndex.value === index ? ` ${prefix}__cmd-row--active` : ""}`}
                    role="option"
                    aria-selected={highlightedIndex.value === index}
                    onMouseDown$={() => {
                      searchQuery.value = suggestion.title;
                      expandedId.value = suggestion.id;
                      setTimeout(() => document.getElementById(suggestion.id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
                      searchFocused.value = false;
                    }}
                  >
                    <span class={`${prefix}__cmd-num`}>{formatNumberIndex(props.sections.findIndex((section) => section.id === suggestion.id))}</span>
                    <span class={`${prefix}__cmd-q`}>{suggestion.title}</span>
                    <svg class={`${prefix}__cmd-arrow`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                ))}
                <div class={`${prefix}__cmd-foot`}><kbd>Esc</kbd> close</div>
              </div>
            )}
          </div>
          {searchQuery.value.trim() && (
            <div class={`${prefix}__s-toolbar`}>
              <span class={`${prefix}__s-stats`}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                {filteredSections.value.length} of {props.sections.length} sections
              </span>
            </div>
          )}
        </div>
        {filteredSections.value.length > 0 ? (
          <div class={`${prefix}__duo`}>
            <nav class={`${prefix}__toc`} aria-label="Table of Contents">
              <span class={`${prefix}__toc-label`}>Contents</span>
              {filteredSections.value.map((section) => {
                const originalIndex = props.sections.findIndex((item) => item.id === section.id);
                return (
                  <button key={section.id} class={`${prefix}__toc-item${expandedId.value === section.id ? ` ${prefix}__toc-item--active` : ""}`} onClick$={() => {
                    toggleSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}>
                    <span class={`${prefix}__toc-num`}>{formatNumberIndex(originalIndex)}</span>
                    {section.title}
                  </button>
                );
              })}
            </nav>
            <div class={`${prefix}__divider`} aria-hidden="true" />
            <div class={`${prefix}__sections`} role="list">
              {filteredSections.value.map((section) => {
                const originalIndex = props.sections.findIndex((item) => item.id === section.id);
                const query = searchQuery.value.trim().toLowerCase();
                const isOpen = query ? true : expandedId.value === section.id;
                return (
                  <section key={section.id} id={section.id} class={`${prefix}__sec${isOpen ? ` ${prefix}__sec--open` : ""}`} role="listitem" data-reveal={hasSearched.value ? "visible" : ""} style={{ transitionDelay: `${originalIndex * 40}ms` }}>
                    <button class={`${prefix}__sec-toggle`} onClick$={() => toggleSection(section.id)} aria-expanded={isOpen} aria-controls={`sec-body-${section.id}`}>
                      <span class={`${prefix}__sec-toggle-left`}>
                        <span class={`${prefix}__sec-num`}>{formatNumberIndex(originalIndex)}</span>
                        <span class={`${prefix}__sec-title`}>{query ? highlightLegalText(section.title, query, `${prefix}__mark`) : section.title}</span>
                      </span>
                      <span class={`${prefix}__chevron`} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                      </span>
                    </button>
                    <div class={`${prefix}__sec-body`} id={`sec-body-${section.id}`} role="region">
                      <div class={`${prefix}__sec-body-inner`}>
                        <div class={`${prefix}__sec-body-content`}>
                          {renderLegalContent(section.content, query, prefix)}
                          {(section.hasDisabledLink || section.hasSupportLink) && (
                            <Link href="/support" class={`${prefix}__support-card`}>
                              <div class={`${prefix}__support-card-icon`} aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                              <div class={`${prefix}__support-card-body`}>
                                <span class={`${prefix}__support-card-title`}>Support Center</span>
                                <span class={`${prefix}__support-card-desc`}>{props.supportDescription}</span>
                              </div>
                              <svg class={`${prefix}__support-card-arrow`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyState
            classPrefix={prefix}
            query={searchQuery.value}
            smartSuggestions={smartSuggestions.value}
            onClear$={clearSearch}
            onSelectSuggestion$={$((word: string) => {
              searchQuery.value = word;
            })}
          />
        )}
        <div class={`${prefix}__footer`}>
          <button class={`${prefix}__footer-link`} onClick$={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span class={`${prefix}__footer-icon`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            </span>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
});
