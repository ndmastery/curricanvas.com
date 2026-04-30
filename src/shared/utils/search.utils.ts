import type { SearchableText } from "@/shared/types/search.types";

const STOP_WORDS = new Set(["a", "an", "the", "is", "it", "to", "of", "in", "on", "for", "and", "or", "by", "my", "i", "do", "can", "how", "what", "are", "you", "your"]);

export function formatNumberIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function getSearchTerms(query: string): string[] {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

export function matchesSearchTerms(value: string, query: string): boolean {
  const terms = getSearchTerms(query);
  if (!terms.length) return true;
  const haystack = value.toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function getSearchWords(items: SearchableText[]): string[] {
  const words = new Set<string>();
  for (const item of items) {
    `${item.title} ${item.content}`.toLowerCase().replace(/[^a-z0-9\s-]/g, "").split(/\s+/).forEach((word) => {
      if (word.length >= 3 && !STOP_WORDS.has(word)) words.add(word);
    });
  }
  return [...words].sort();
}

export function getEditDistance(first: string, second: string): number {
  let a = first;
  let b = second;
  if (a.length > b.length) [a, b] = [b, a];
  const row = Array.from({ length: a.length + 1 }, (_, index) => index);
  for (let j = 1; j <= b.length; j++) {
    let previous = row[0];
    row[0] = j;
    for (let i = 1; i <= a.length; i++) {
      const next = row[i];
      row[i] = a[i - 1] === b[j - 1] ? previous : 1 + Math.min(previous, row[i], row[i - 1]);
      previous = next;
    }
  }
  return row[a.length];
}

export function getSmartSuggestions(query: string, words: string[], limit = 8): string[] {
  const term = query.toLowerCase().trim();
  if (term.length < 2) return [];
  const scored: Array<{ word: string; score: number }> = [];
  for (const word of words) {
    if (word === term) continue;
    let score = 99;
    if (word.startsWith(term)) score = 0;
    else if (word.includes(term)) score = 1;
    else if (term.length >= 3) {
      const distance = getEditDistance(term, word);
      if (distance <= 2) score = 2 + distance;
    }
    if (score < 99) scored.push({ word, score });
  }
  scored.sort((a, b) => a.score - b.score || a.word.localeCompare(b.word));
  return scored.slice(0, limit).map((item) => item.word);
}
