import { SUPPORT_EMAIL } from "@/shared/constants/app.constants";
import type { LegalSection } from "@/features/legal/types/legal.types";

export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
  {
    id: "information-collected",
    title: "Information We Collect",
    content: `We collect information you provide directly to us when you use CurriCanvas.

**Account Information:** When you register, we collect your email address, display name, username, and profile avatar. If you sign in via OAuth (GitHub, Google, GitLab, or Bitbucket), we receive your name, email address, and profile avatar from the respective provider.

**Resume Content:** We store all resume data you enter into the platform, including your professional experience, educational background, skills, portfolio items, certifications, publications, community memberships, and contact platform links.

**OAuth Repository Tokens:** When you connect GitHub, GitLab, or Bitbucket, we store access tokens (encrypted at rest) to fetch your repository data on your behalf. You may revoke these connections at any time from your account settings.

**Export and Sharing Data:** We retain records of all exports you generate, including the format (PDF, PNG, DOCX), theme variant, timestamp, and download count. Shareable resume snapshots are stored as immutable copies linked to a unique token.

**Usage and Technical Data:** We collect server logs, IP addresses, browser user agent strings, and device fingerprints (one-way FNV-1a hashes — not reversible to identify you personally) for view counting on shared resumes and for abuse prevention.

**Credit Transaction Ledger:** Every credit deduction and top-up is recorded with the action type, credit amount, and timestamp.

**Payment Information:** Credit purchases are processed by our payment provider. We do not store raw card numbers, CVVs, or full bank account details on our servers.`,
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: `We use the information we collect for the following purposes:

**Providing the Service:** To create and maintain your account, render resume previews, generate exports in PDF, PNG, and DOCX formats, manage your drafts, and deliver shareable resume links.

**AI Features:** Resume content you submit for AI-powered import or AI section polishing is sent to one or more large language model providers (currently Anthropic Claude, OpenAI GPT, and Google Gemini). These requests are processed in real time and are not stored persistently by the model providers under our enterprise agreements.

**Repository Integration:** Repository data fetched from GitHub, GitLab, or Bitbucket is used solely to populate your resume and is not shared with third parties.

**Credit and Billing:** Transaction history is used to calculate your current credit balance, display your usage history, and process top-up payments.

**View and Download Tracking:** Device fingerprints are used exclusively to count unique resume views on your public share pages. This data is never cross-referenced to identify individual users by name or linked profile.

**Security and Fraud Prevention:** IP addresses and usage patterns are monitored to detect and prevent abuse, unauthorized access, and fraudulent activity.

**Communications:** We send transactional emails (account verification, password reset) via our email delivery service. We do not send marketing emails unless you explicitly opt in.

**Service Improvement:** Aggregated, anonymized usage data is used to improve product features and performance.`,
  },
  {
    id: "data-sharing",
    title: "How We Share Your Information",
    content: `We do not sell your personal data. We share information only in the following circumstances:

**Infrastructure and Database:** Your data is stored in a secure cloud database hosted on AWS infrastructure. All data is encrypted at rest (AES-256) and in transit (TLS 1.3+).

**AI Processing:** Resume text submitted for AI features is sent to Anthropic, OpenAI, and/or Google depending on availability and plan. These providers process data under data processing agreements that prohibit training on your data.

**Email Delivery:** Transactional emails are delivered via our email service provider. Only your email address and the content of the transactional message are shared.

**Payment Processing:** Credit card and payment information is processed by our payment gateway. We receive only a transaction confirmation and masked card summary.

**Legal Requirements:** We may disclose information if required by applicable law, court order, or governmental authority, or if we believe disclosure is necessary to protect the rights, property, or safety of CurriCanvas, our users, or the public.

**Business Transfers:** In the event of a merger, acquisition, or sale of all or part of our assets, your information may be transferred to the acquiring entity, subject to the same privacy protections described in this policy.`,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: `We retain your data for as long as your account is active or as needed to provide you with the service.

**Resume Data and Drafts:** Stored indefinitely while your account is active. Deleted immediately upon account deletion request.

**Exported Files and Snapshots:** Export records and shareable resume snapshots are retained indefinitely unless you explicitly delete them. Deleted exports enter a 30-day trash period, after which they are permanently purged.

**Credit Transactions:** Transaction records are retained for 7 years to comply with financial record-keeping requirements.

**Server Logs:** Standard server logs (IP, user agent, timestamps) are retained for 90 days and then automatically purged.

**Device Fingerprints for View Counting:** Stored as irreversible hashes. Retained for 12 months per share token, then purged.

**OAuth Tokens:** Stored encrypted and deleted when you disconnect the integration or delete your account.`,
  },
  {
    id: "security",
    title: "Security",
    content: `We take the security of your data seriously and implement industry-standard technical and organizational measures.

**Database Security:** All tables are protected by Row-Level Security (RLS) policies. Each user can only access their own rows, enforced at the database level — not just the application layer.

**Authentication:** We use secure session management with industry-standard authentication protocols. OAuth tokens are exchanged via server-side callbacks and never exposed to client-side JavaScript.

**Encryption:** All data is encrypted at rest (AES-256) and all communications use TLS 1.3+ in transit.

**Session Timeout:** Sessions are automatically invalidated after 30 minutes of inactivity to reduce risk from unattended devices.

**Vulnerability Disclosure:** If you discover a security vulnerability, please report it responsibly to ${SUPPORT_EMAIL}. We aim to acknowledge all reports within 48 hours.`,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: `Depending on your jurisdiction, you may have the following rights regarding your personal data:

**Access:** You may request a copy of all personal data we hold about you, including your resume data, credit history, export records, and account information.

**Correction:** You may update or correct inaccurate information directly through your account settings at any time.

**Deletion:** You may delete your account at any time from your account settings. Upon deletion, we will permanently remove your resume data, drafts, OAuth tokens, and profile information within 30 days, subject to our retention obligations for financial records.

**Portability:** You may export your resume data in structured formats (PDF, PNG, DOCX) at any time.

**Withdrawal of Consent:** You may disconnect any OAuth integration (GitHub, GitLab, Bitbucket) at any time without affecting your ability to use other features.

**Complaints:** If you are located in the EEA or UK, you have the right to lodge a complaint with your local data protection authority.

To exercise any of these rights, contact us at ${SUPPORT_EMAIL}.`,
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    content: `CurriCanvas integrates with the following third-party services. We encourage you to review their respective privacy policies.

**Anthropic** (AI features — Claude): anthropic.com/privacy
**OpenAI** (AI features — GPT): openai.com/policies/privacy-policy
**Google** (AI features — Gemini): policies.google.com/privacy
**Resend** (Email delivery): resend.com/legal/privacy-policy
**GitHub** (OAuth and repository import): docs.github.com/en/site-policy/privacy-policies
**GitLab** (OAuth and repository import): about.gitlab.com/privacy
**Bitbucket / Atlassian** (OAuth and repository import): atlassian.com/legal/privacy-policy`,
  },
  {
    id: "cookies",
    title: "Cookies and Local Storage",
    content: `CurriCanvas uses browser localStorage (not cookies) to remember your selected theme and locale preferences. No tracking cookies are set. No third-party advertising or analytics SDKs are embedded on the marketing site at curricanvas.com.

The web application at web.curricanvas.com uses session cookies required for authentication and security. These are HttpOnly, Secure, and SameSite=Lax. No advertising cookies are used.`,
  },
  {
    id: "children",
    title: "Children's Privacy",
    content: `CurriCanvas is not directed at children under the age of 13 (or under 16 in the EEA). We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us at ${SUPPORT_EMAIL} and we will promptly delete it.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify registered users of material changes via email or an in-app notification at least 14 days before the changes take effect. Your continued use of CurriCanvas after the effective date of a revised policy constitutes your acceptance of the updated terms.`,
  },
  {
    id: "support",
    title: "Support",
    content: `Need help with a privacy-related matter or have a question about our data practices? Visit our Support page to select the type of assistance that best fits your needs — including direct contact, frequently asked questions, and guided help.`,
    hasDisabledLink: true,
  },
];
