

import { isCountdownComplete } from "@/shared/config/countdown.config";

export interface ChangelogHighlight {
  text: string;
}

export interface ChangelogVersion {
  version: string;
  date: string;
  status: "stable" | "latest";
  summary: string;
  highlights: ChangelogHighlight[];
}

interface ChangelogEntryRaw {
  date: string;
  status: "stable" | "latest";
  summary: string;
  highlights: string[];
}

function parseChangelogJSON(): ChangelogVersion[] {
  const raw = import.meta.env.PUBLIC_CHANGELOG_JSON;
  if (!raw) return [];

  try {
    const parsed: Record<string, ChangelogEntryRaw> = JSON.parse(raw);
    return Object.entries(parsed).map(([version, entry]) => ({
      version,
      date: entry.date,
      status: entry.status,
      summary: entry.summary,
      highlights: entry.highlights.map((text) => ({ text })),
    }));
  } catch {
    console.warn("[CurriCanvas] Failed to parse PUBLIC_CHANGELOG_JSON");
    return [];
  }
}

export function getAllChangelog(): ChangelogVersion[] {
  return parseChangelogJSON();
}

export function getVisibleChangelog(now: Date = new Date()): ChangelogVersion[] {
  const all = parseChangelogJSON();
  if (all.length === 0) return [];

  
  if (!isCountdownComplete(now)) {
    return all.filter((entry) => entry.status !== "latest");
  }

  return all;
}

export function getAnnouncementMessage(): string {
  return (
    import.meta.env.PUBLIC_ANNOUNCEMENT_MESSAGE ||
    ""
  );
}
