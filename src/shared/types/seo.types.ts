import type { DocumentHead } from "@builder.io/qwik-city";

export interface SeoPageConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  twitterCard?: "summary" | "summary_large_image";
  robots?: string;
}

export type PageHead = DocumentHead;
