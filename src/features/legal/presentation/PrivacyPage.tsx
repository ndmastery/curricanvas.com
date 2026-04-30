import { component$, useStyles$ } from "@builder.io/qwik";
import { DocumentPage } from "@/features/legal/presentation/DocumentPage";
import styles from "@/features/legal/presentation/styles/privacy-policy.css?inline";
import { PRIVACY_POLICY_SECTIONS } from "@/features/legal/data/privacy-policy.data";
import { APP_NAME, EFFECTIVE_DATE, WEB_APP_URL } from "@/shared/constants/app.constants";

export const PrivacyPage = component$(() => {
  useStyles$(styles);

  return (
    <DocumentPage
      classPrefix="ppg"
      effectiveDate={EFFECTIVE_DATE}
      intro={`This Privacy Policy describes how <strong>${APP_NAME}</strong> ("we", "us", or "our"), operated by PT Next Digital Mastery, collects, uses, and shares information about you when you use our website at <a href="https://curricanvas.com">curricanvas.com</a> and our web application at`}
      introWebAppUrl={WEB_APP_URL}
      pageTitle="Privacy Policy"
      scopeLabel="Policy"
      searchInputId="ppg-search-input"
      searchLabel="Search Privacy Policy"
      searchPlaceholder="Search policy sections…"
      sections={PRIVACY_POLICY_SECTIONS}
      supportDescription="Direct contact, FAQs, and guided help — all in one place."
    />
  );
});
