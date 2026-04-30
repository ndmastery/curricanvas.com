import { component$, useStyles$, useSignal, useVisibleTask$, useComputed$, $, useOnDocument } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { APP_NAME } from "@/shared/constants/app.constants";
import { getVisibleChangelog } from "@/shared/config/changelog.config";
import type { ChangelogVersion } from "@/shared/config/changelog.config";
import styles from "@/features/changelog/presentation/styles/changelog.css?inline";
import { ChangelogReleaseList } from "@/features/changelog/presentation/ChangelogReleaseList";

const PAGE_SIZE = 10;

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

function findSmartSuggestions(query: string, releases: ChangelogVersion[]): string[] {
  const q = query.toLowerCase();
  const words = new Set<string>();
  releases.forEach((r) => {
    `${r.version} ${r.summary} ${r.highlights.map(h => h.text).join(" ")}`.toLowerCase()
      .split(/\W+/).filter(w => w.length > 2).forEach(w => words.add(w));
  });
  return [...words]
    .map(w => ({ w, d: levenshtein(q, w) }))
    .filter(x => x.d <= 3 && x.d > 0)
    .sort((a, b) => a.d - b.d)
    .slice(0, 6)
    .map(x => x.w);
}

const hl = (text: string, query: string) => {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(re);
  return parts.map((p, i) => re.test(p) ? <mark key={i} class="clg__mark">{p}</mark> : p);
};

const fmtIdx = (i: number) => String(i + 1).padStart(2, "0");

export const ChangelogPage = component$(() => {
  useStyles$(styles);

  const releases = getVisibleChangelog().slice().reverse();
  const latestVersion = releases.length > 0 ? releases[0].version : "";

  const expandedVersion = useSignal(latestVersion);
  const visibleCount = useSignal(Math.min(PAGE_SIZE, releases.length));
  const searchQuery = useSignal("");
  const searchFocused = useSignal(false);
  const highlightedIdx = useSignal(-1);
  const hasSearched = useSignal(false);

  const toggleEntry = $((version: string) => {
    expandedVersion.value = expandedVersion.value === version ? "" : version;
  });

  const loadMore = $(() => {
    visibleCount.value = Math.min(visibleCount.value + PAGE_SIZE, releases.length);
  });

  const showLess = $(() => {
    visibleCount.value = PAGE_SIZE;
  });

  const clearSearch = $(() => { searchQuery.value = ""; });
  const updateSearch = $((query: string) => {
    searchQuery.value = query;
  });

  
  useOnDocument("keydown", $((e: Event) => {
    const ev = e as KeyboardEvent;
    if ((ev.metaKey || ev.ctrlKey) && ev.key === "k") {
      ev.preventDefault();
      const el = document.getElementById("clg-search-input") as HTMLInputElement | null;
      if (el) { el.focus(); el.select(); }
    }
  }));

  const filteredReleases = useComputed$(() => {
    const q = searchQuery.value.trim().toLowerCase();
    if (!q) return releases;
    hasSearched.value = true;
    const terms = q.split(/\s+/).filter(Boolean);
    return releases.filter((r) => {
      const hay = `v${r.version} ${r.date} ${r.summary} ${r.highlights.map(h => h.text).join(" ")}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  });

  const suggestions = useComputed$(() => {
    const q = searchQuery.value.trim().toLowerCase();
    if (!q) return [] as { title: string; version: string }[];
    return releases.filter((r) => {
      const hay = `v${r.version} ${r.summary} ${r.highlights.map(h => h.text).join(" ")}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 6).map((r) => ({ title: `v${r.version} — ${r.summary.substring(0, 60)}`, version: r.version }));
  });

  const smartSuggestions = useComputed$(() => {
    const q = searchQuery.value.trim();
    if (!q || filteredReleases.value.length > 0) return [] as string[];
    return findSmartSuggestions(q, releases);
  });

  
  useVisibleTask$(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els.length) return;

    if (reduced) {
      els.forEach((el) => { el.dataset.reveal = "visible"; });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.reveal = "visible";
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  const sidebarReleases = releases.slice(0, visibleCount.value);
  const hasMore = visibleCount.value < releases.length;
  const canCollapse = visibleCount.value > PAGE_SIZE;

  return (
    <div class="clg">
      <div class="clg__mesh" aria-hidden="true" />
      <div class="clg__grain" aria-hidden="true" />

      <div class="clg__wrap">
        
        <header class="clg__header">
          <div class="clg__toprow">
            <Link href="/" class="clg__back">
              <span class="clg__back-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
              </span>
              Back to Home
            </Link>

            <span class="clg__eyebrow">
              <span class="clg__eyebrow-dot" aria-hidden="true" />
              Release History
            </span>
          </div>

          <h1 class="clg__title">Changelog</h1>
          <p class="clg__subtitle">
            Every release, every improvement — tracked from day one.
          </p>
        </header>

        
        <div class="clg__s" data-focused={searchFocused.value ? "" : undefined}>
          <div class="clg__s-bar">
            <span class="clg__s-scope">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Releases
            </span>
            <input
              id="clg-search-input"
              class="clg__s-input"
              type="text"
              placeholder="Search releases..."
              value={searchQuery.value}
              onInput$={(_, el) => {
                searchQuery.value = el.value;
                highlightedIdx.value = -1;
              }}
              onFocus$={() => { searchFocused.value = true; }}
              onBlur$={() => { setTimeout(() => { searchFocused.value = false; }, 150); }}
              onKeyDown$={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); highlightedIdx.value = Math.min(highlightedIdx.value + 1, suggestions.value.length - 1); }
                else if (e.key === "ArrowUp") { e.preventDefault(); highlightedIdx.value = Math.max(highlightedIdx.value - 1, 0); }
                else if (e.key === "Enter") {
                  e.preventDefault();
                  searchFocused.value = false;
                  if (highlightedIdx.value >= 0 && suggestions.value[highlightedIdx.value]) {
                    const s = suggestions.value[highlightedIdx.value];
                    expandedVersion.value = s.version;
                    highlightedIdx.value = -1;
                    setTimeout(() => {
                      const el = document.getElementById(`v${s.version}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }
                }
                else if (e.key === "Escape") { searchFocused.value = false; }
              }}
              autoComplete="off"
            />
            {!searchQuery.value.trim() && <span class="clg__s-hint">⌘K</span>}
            {searchQuery.value.trim() && (
              <button class="clg__s-clear" onClick$={clearSearch} type="button" aria-label="Clear search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}

            
            {searchFocused.value && suggestions.value.length > 0 && (
              <div class="clg__cmd" role="listbox">
                <div class="clg__cmd-head">
                  <span class="clg__cmd-label">Quick results</span>
                  <span class="clg__cmd-count">{suggestions.value.length}</span>
                  <span class="clg__cmd-keys">
                    <kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> select
                  </span>
                </div>
                {suggestions.value.map((s, i) => (
                  <button
                    key={i}
                    class={`clg__cmd-row${highlightedIdx.value === i ? " clg__cmd-row--active" : ""}`}
                    type="button"
                    role="option"
                    aria-selected={highlightedIdx.value === i}
                    onMouseEnter$={() => { highlightedIdx.value = i; }}
                    onClick$={() => {
                      expandedVersion.value = s.version;
                      searchFocused.value = false;
                      highlightedIdx.value = -1;
                      setTimeout(() => {
                        const el = document.getElementById(`v${s.version}`);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }}
                  >
                    <span class="clg__cmd-num">{fmtIdx(i)}</span>
                    <span class="clg__cmd-q">{s.title}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="clg__cmd-arrow"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                ))}
                <div class="clg__cmd-foot">
                  <kbd>Esc</kbd> close
                </div>
              </div>
            )}
          </div>

          
          {searchQuery.value.trim() && (
            <div class="clg__s-toolbar">
              <span class="clg__s-stats">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                {filteredReleases.value.length} of {releases.length} releases
              </span>
            </div>
          )}
        </div>

        
        <ChangelogReleaseList
          canCollapse={canCollapse}
          clearSearch$={clearSearch}
          expandedVersion={expandedVersion.value}
          hasMore={hasMore}
          hasSearched={hasSearched.value}
          loadMore$={loadMore}
          query={searchQuery.value}
          releases={releases}
          searchResults={filteredReleases.value}
          showLess$={showLess}
          sidebarReleases={sidebarReleases}
          smartSuggestions={smartSuggestions.value}
          toggleEntry$={toggleEntry}
          updateSearch$={updateSearch}
        />

        
        <div class="clg__footer">
          <button
            class="clg__footer-link"
            onClick$={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span class="clg__footer-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            </span>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
});
