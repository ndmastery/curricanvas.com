import { createPageHead } from "@/shared/config/seo.config";

export const privacyPolicyHead = createPageHead({
  title: "Privacy Policy — CurriCanvas",
  description: "Read the CurriCanvas Privacy Policy. Learn how we collect, use, and protect your personal data including resume content, OAuth tokens, and credit transactions.",
  path: "/privacy-policy",
});

export const termsOfServiceHead = createPageHead({
  title: "Terms of Service — CurriCanvas",
  description: "Read the CurriCanvas Terms of Service. Understand your rights and responsibilities when using our AI-powered resume builder, credit system, shared links, and export features.",
  path: "/terms-of-service",
});
