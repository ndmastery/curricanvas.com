import { component$, type PropFunction } from "@builder.io/qwik";
import type { ChangelogVersion } from "@/shared/config/changelog.config";

interface ReleaseListProps {
  canCollapse: boolean;
  clearSearch$: PropFunction<() => void>;
  expandedVersion: string;
  hasMore: boolean;
  hasSearched: boolean;
  loadMore$: PropFunction<() => void>;
  query: string;
  releases: ChangelogVersion[];
  searchResults: ChangelogVersion[];
  showLess$: PropFunction<() => void>;
  sidebarReleases: ChangelogVersion[];
  smartSuggestions: string[];
  toggleEntry$: PropFunction<(version: string) => void>;
  updateSearch$: PropFunction<(query: string) => void>;
}

const highlight = (text: string, query: string) => {
  if (!query) return text;
  const pattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matcher = new RegExp(`^${pattern}$`, "i");
  return text.split(new RegExp(`(${pattern})`, "gi")).map((part, index) => (
    matcher.test(part) ? <mark key={index} class="clg__mark">{part}</mark> : part
  ));
};

export const ReleaseList = component$((props: ReleaseListProps) => {
  if (props.searchResults.length === 0) {
    return (
      <div class="clg__nil">
        <div class="clg__nil-dots" aria-hidden="true" />
        <div class="clg__nil-ring" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
        <h3 class="clg__nil-title">No results for <span class="clg__nil-q">"{props.query.trim()}"</span></h3>
        <p class="clg__nil-desc">We couldn't find any releases matching your query. Try a different term or reset the search.</p>
        <button class="clg__nil-reset" onClick$={props.clearSearch$} type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Reset search
        </button>
        {props.smartSuggestions.length > 0 && (
          <div class="clg__nil-sug">
            <span class="clg__nil-sug-label">Try these instead</span>
            <div class="clg__nil-sug-list">
              {props.smartSuggestions.map((word) => (
                <button key={word} class="clg__nil-chip" type="button" onClick$={() => props.updateSearch$(word)}>
                  {word}
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="clg__nil-chip-arrow"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div class="clg__duo">
      <nav class="clg__index" aria-label="Version index">
        {props.sidebarReleases.filter((release) => props.searchResults.some((result) => result.version === release.version)).map((release) => (
          <a key={release.version} href={`#v${release.version}`} class={`clg__index-item${props.expandedVersion === release.version ? " clg__index-item--active" : ""}`} onClick$={(event) => {
            event.preventDefault();
            props.toggleEntry$(release.version);
            document.getElementById(`v${release.version}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            <span class="clg__index-dot" aria-hidden="true" />
            v{release.version}
            <span class="clg__index-tag">{release.status === "latest" ? "latest" : "stable"}</span>
          </a>
        ))}
        {props.hasMore && !props.query.trim() && (
          <button class="clg__index-more" onClick$={props.loadMore$}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
            Show more
          </button>
        )}
        {props.canCollapse && !props.hasMore && !props.query.trim() && (
          <button class="clg__index-more clg__index-more--less" onClick$={props.showLess$}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>
            Show less
          </button>
        )}
      </nav>
      <div class="clg__divider" aria-hidden="true" />
      <div class="clg__detail" role="list">
        {props.searchResults.map((release, index) => {
          const query = props.query.trim().toLowerCase();
          const isOpen = query ? true : props.expandedVersion === release.version;
          return (
            <article key={release.version} class={`clg__entry${isOpen ? " clg__entry--open" : ""}`} role="listitem" id={`v${release.version}`} data-reveal={props.hasSearched ? "visible" : ""} style={{ transitionDelay: `${index * 60}ms` }}>
              <button class="clg__entry-toggle" onClick$={() => props.toggleEntry$(release.version)} aria-expanded={isOpen} aria-controls={`body-${release.version}`}>
                <span class="clg__entry-toggle-left">
                  <span class="clg__version">v{release.version}</span>
                  <span class={`clg__tag clg__tag--${release.status}`}>{release.status === "latest" ? "Latest" : "Stable"}</span>
                </span>
                <span class="clg__entry-toggle-right">
                  <span class="clg__date">{release.date}</span>
                  <span class="clg__chevron" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                  </span>
                </span>
              </button>
              <div class="clg__entry-body" id={`body-${release.version}`} role="region">
                <div class="clg__entry-body-inner">
                  <div class="clg__entry-body-content">
                    <p class="clg__summary">{highlight(release.summary, query)}</p>
                    <div class="clg__hl-wrap">
                      <ul class="clg__highlights" aria-label={`Highlights for v${release.version}`}>
                        {release.highlights.map((item) => (
                          <li key={item.text} class="clg__hl">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="clg__hl-check"><polyline points="20 6 9 17 4 12"/></svg>
                            <span class="clg__hl-text">{highlight(item.text, query)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
});
