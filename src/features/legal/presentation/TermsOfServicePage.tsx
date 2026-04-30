import { component$, useStyles$ } from "@builder.io/qwik";
import { LegalDocumentPage } from "@/features/legal/presentation/LegalDocumentPage";
import styles from "@/features/legal/presentation/styles/terms-of-service.css?inline";
import { TERMS_OF_SERVICE_SECTIONS } from "@/features/legal/data/terms-of-service.data";
import { APP_NAME, EFFECTIVE_DATE, WEB_APP_URL } from "@/shared/constants/app.constants";

export const TermsOfServicePage = component$(() => {
  useStyles$(styles);

  return (
    <LegalDocumentPage
      classPrefix="tos"
      effectiveDate={EFFECTIVE_DATE}
      intro={`Please read these Terms of Service carefully before using <strong>${APP_NAME}</strong>. By accessing or using our Service, you agree to be bound by these Terms. These Terms govern your use of <a href="https://curricanvas.com">curricanvas.com</a> and`}
      introWebAppUrl={WEB_APP_URL}
      pageTitle="Terms of Service"
      scopeLabel="Terms"
      searchInputId="tos-search-input"
      searchLabel="Search Terms of Service"
      searchPlaceholder="Search terms and conditions…"
      sections={TERMS_OF_SERVICE_SECTIONS}
      supportDescription="Direct contact, self-service guides, and account assistance."
    />
  );
});
