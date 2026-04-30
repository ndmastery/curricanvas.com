import type { DocumentHead } from "@builder.io/qwik-city";
import type { SeoPageConfig } from "@/shared/types/seo.types";
import { APP_NAME, APP_URL, SEO_IMAGE_URL } from "@/shared/constants/app.constants";

export function createPageHead(config: SeoPageConfig): DocumentHead {
  const url = `${APP_URL}${config.path}`;
  const image = config.image ?? SEO_IMAGE_URL;

  return {
    title: config.title,
    meta: [
      { name: "description", content: config.description },
      { name: "robots", content: config.robots ?? "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: config.title },
      { property: "og:description", content: config.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:site_name", content: APP_NAME },
      { name: "twitter:card", content: config.twitterCard ?? "summary" },
      { name: "twitter:title", content: config.title },
      { name: "twitter:description", content: config.description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
