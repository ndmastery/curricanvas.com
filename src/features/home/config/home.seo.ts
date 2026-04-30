import type { DocumentHead } from "@builder.io/qwik-city";
import {
  APP_NAME,
  APP_TAGLINE,
  APP_URL,
  LOGO_IMAGE_URL,
  SEO_IMAGE_URL,
} from "@/shared/constants/app.constants";

const title = `${APP_NAME} — ${APP_TAGLINE}`;
const description = "CurriCanvas is the AI-powered resume builder for developers. Create ATS-optimized, beautifully designed resumes with shareable links, multi-format exports, and real developer tools.";

export const homeHead: DocumentHead = {
  title,
  meta: [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: "AI-powered resume builder with ATS optimization, multi-format export, portfolio sharing, and GitHub integration." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: APP_URL },
    { property: "og:image", content: SEO_IMAGE_URL },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "CurriCanvas — AI-powered resume builder" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: "AI-powered resume builder with ATS optimization, shareable links, and developer tools." },
    { name: "twitter:image", content: SEO_IMAGE_URL },
    { name: "twitter:image:alt", content: "CurriCanvas application preview" },
    { name: "theme-color", content: "#B85C38" },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { name: "author", content: APP_NAME },
    { name: "generator", content: "Qwik" },
  ],
  links: [{ rel: "canonical", href: APP_URL }],
  scripts: [
    {
      props: { type: "application/ld+json" },
      script: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${APP_URL}/#organization`,
            name: APP_NAME,
            url: APP_URL,
            logo: {
              "@type": "ImageObject",
              url: LOGO_IMAGE_URL,
              width: 512,
              height: 512,
            },
            sameAs: [],
          },
          {
            "@type": "WebSite",
            "@id": `${APP_URL}/#website`,
            url: APP_URL,
            name: APP_NAME,
            description: "AI-powered resume builder for developers",
            publisher: { "@id": `${APP_URL}/#organization` },
            inLanguage: ["en-US", "zh", "ar", "id", "ms", "ta"],
          },
          {
            "@type": "WebPage",
            "@id": `${APP_URL}/#webpage`,
            url: APP_URL,
            name: title,
            isPartOf: { "@id": `${APP_URL}/#website` },
            about: { "@id": `${APP_URL}/#organization` },
            description,
            inLanguage: "en-US",
          },
          {
            "@type": "SoftwareApplication",
            name: APP_NAME,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        ],
      }),
    },
  ],
};
