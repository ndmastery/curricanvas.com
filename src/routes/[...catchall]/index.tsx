import { component$, useContext, useComputed$ } from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import { type DocumentHead, Link } from "@builder.io/qwik-city";
import { LocaleContext } from "@/app/providers/locale.provider";
import { getTranslations, t } from "@/i18n/index";
import { APP_NAME } from "@/shared/constants/app.constants";
import { LogoIcon } from "@/shared/ui/icons/LogoIcon";
import errorStyles from "@/routes/[...catchall]/error.css?inline";

const ArrowLeft = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

export default component$(() => {
  useStyles$(errorStyles);

  const locale = useContext(LocaleContext);
  const translations = useComputed$(() => getTranslations(locale.value));

  return (
    <div class="e4">
      <div class="e4__mesh" aria-hidden="true" />
      <div class="e4__grain" aria-hidden="true" />

      
      <div class="e4__main">
        <div class="e4__split">

          
          <div class="e4__visual">
            <div class="e4__numeral-glow" aria-hidden="true" />
            <span class="e4__numeral" aria-hidden="true">404</span>
          </div>

          
          <div class="e4__content">
            <span class="e4__eyebrow">
              <span class="e4__eyebrow-dot" aria-hidden="true" />
              {APP_NAME}
            </span>

            <h1 class="e4__heading">{t(translations.value, "error404.title")}</h1>
            <p class="e4__desc">
              {t(translations.value, "error404.subtitle")}
              {" "}
              {t(translations.value, "error404.subtitle2")}
            </p>

            <span class="e4__line" aria-hidden="true" />

            <div class="e4__actions">
              <Link href="/" class="e4__cta e4__cta--primary" id="error-home-cta">
                <span class="e4__cta-icon e4__cta-icon--back"><ArrowLeft /></span>
                {t(translations.value, "error404.cta")}
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "404 — Page Not Found · CurriCanvas",
  meta: [
    { name: "description", content: "The page you are looking for does not exist on CurriCanvas." },
    { name: "robots", content: "noindex" },
  ],
};
