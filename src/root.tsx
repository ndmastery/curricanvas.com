import { component$, isDev } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "@/app/head/RouterHead";
import { ThemeProvider } from "@/app/providers/theme.provider";
import { LocaleProvider } from "@/app/providers/locale.provider";
import "@/global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preload"
          as="image"
          href="/curricanvas-preview.png"
          fetchPriority="high"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad$={() => {
            const el = document.querySelector('link[href*="fonts.googleapis"]') as HTMLLinkElement;
            if (el) el.media = "all";
          }}
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
          rel="stylesheet"
          media="print"
          onLoad$={() => {
            const el = document.querySelector('link[href*="fontshare"]') as HTMLLinkElement;
            if (el) el.media = "all";
          }}
        />
        <noscript>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&display=swap" rel="stylesheet" />
          <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" rel="stylesheet" />
        </noscript>
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en">
        <ThemeProvider>
          <LocaleProvider>
            <RouterOutlet />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </QwikCityProvider>
  );
});
