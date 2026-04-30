import { SUPPORT_EMAIL } from "@/shared/constants/app.constants";
import type { LegalSection } from "@/features/legal/types/legal.types";

export const TERMS_OF_SERVICE_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: `By accessing or using CurriCanvas at curricanvas.com or web.curricanvas.com (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, you must not use the Service.

These Terms constitute a legally binding agreement between you and PT Next Digital Mastery ("Company", "we", "us", or "our"), the operator of CurriCanvas.

We reserve the right to update these Terms at any time. Material changes will be communicated via email or in-app notification at least 14 days before taking effect. Continued use after the effective date constitutes acceptance.`,
  },
  {
    id: "eligibility",
    title: "Eligibility and Accounts",
    content: `You must be at least 13 years old (or 16 in the EEA) to use CurriCanvas. By using the Service, you represent that you meet this requirement.

**Account Creation:** You may register using an email and password or via OAuth (GitHub, Google, GitLab, or Bitbucket). You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account.

**Username:** Upon first sign-in, you will be prompted to choose a unique username. Usernames must be alphanumeric (with underscores), between 3 and 32 characters, and may not impersonate other individuals, companies, or brands.

**Account Security:** You must notify us immediately at ${SUPPORT_EMAIL} if you suspect unauthorized access to your account. We are not liable for any losses resulting from your failure to protect your credentials.

**Account Termination:** You may delete your account at any time through your account settings. We may suspend or terminate accounts that violate these Terms.`,
  },
  {
    id: "service-description",
    title: "Description of the Service",
    content: `CurriCanvas is an AI-assisted resume builder that provides the following capabilities:

**Resume Editing:** A rich editor supporting over 15 resume sections including contact links, professional positions, portfolio items, skills, education, certificates, publications, and more.

**Export:** Generation of resume documents in PDF, PNG, and DOCX formats across Light, Dark, and Pure Black themes. Export is a credit-deducting action.

**ATS and Professional Modes:** Two resume rendering modes optimized for Applicant Tracking System compatibility and visual design, respectively.

**AI Features:** AI-powered resume drafting using large language model APIs. AI features consume credits and require submitting resume text to third-party AI providers.

**Shareable Resume Links:** Public, token-based URLs allowing anyone to view or download your resume without an account. Backed by immutable snapshots.

**Repository Integration:** OAuth-based import of GitHub, GitLab, and Bitbucket repositories to populate your resume automatically.

**Credit System:** A credit-based economy where certain actions deduct credits from your balance. You receive 3 credits per 30-day cycle at no cost. Additional credits are available for purchase.

The Service is provided "as is" and we reserve the right to modify, suspend, or discontinue any feature with reasonable notice.`,
  },
  {
    id: "credit-system",
    title: "Credit System and Payments",
    content: `**Free Credits:** Each account receives 3 free credits at the start of each 30-day reset cycle. These credits expire if unused and do not roll over.

**Credit Costs:** The following actions deduct credits from your balance:
- Export PDF, PNG, or DOCX: 1 credit
- Load a previously saved export: 0.5 credits
- Load a draft: 0.5 credits
- Restore an export from Trash: 0.5 credits
- AI Resume Import: 3 credits
- AI Section Save: 0.5 credits
- Custom Domain activation: 999 credits

**Top-Up Purchases:** Additional credits may be purchased at $0.50 USD per credit. All payments are final and non-refundable unless required by applicable consumer protection law.

**Insufficient Credits:** If you do not have sufficient credits to perform an action, you will be prompted to top up. We will not perform credit-deducting actions without your explicit confirmation.

**Price Changes:** We reserve the right to change credit prices with 30 days' notice. Purchased credits are not affected by price changes after the point of purchase.

**Taxes:** Prices listed are exclusive of any applicable taxes. You are responsible for paying all applicable taxes in your jurisdiction.`,
  },
  {
    id: "content",
    title: "Your Content",
    content: `**Ownership:** You retain full ownership of all resume content you create or upload to CurriCanvas, including text, images, and links.

**License to Us:** By using the Service, you grant us a limited, non-exclusive, royalty-free license to store, process, render, and transmit your content solely as necessary to provide the Service — including generating exports, serving shared resume pages, and processing AI requests.

**Responsibility:** You are solely responsible for the accuracy, legality, and completeness of your resume content. You must not include content that is false, defamatory, harassing, discriminatory, or infringing on third-party intellectual property rights.

**AI-Generated Content:** Content generated by the AI features is a starting point and may be inaccurate, biased, or incomplete. You are responsible for reviewing and verifying all AI-generated text before using it in a professional context.

**Shared Resumes:** When you generate a shareable link, your resume content becomes publicly accessible via that URL. You are responsible for what you choose to share.`,
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    content: `You agree not to use CurriCanvas to:

- Create resumes containing false credentials, fabricated employment history, or misrepresented qualifications
- Upload or transmit malware, viruses, or any malicious code
- Attempt to gain unauthorized access to other accounts, our systems, or third-party services
- Scrape, harvest, or systematically collect data from the Service
- Use the AI features to generate spam, misinformation, or content intended to deceive
- Violate any applicable local, national, or international laws or regulations
- Reverse engineer, decompile, or disassemble any part of the Service
- Distribute or sell access to the Service, including reselling generated resume snapshots at scale

Violation of these use policies may result in immediate account suspension without refund.`,
  },
  {
    id: "ip",
    title: "Intellectual Property",
    content: `**Our IP:** CurriCanvas, its design, interface, underlying codebase, and all related intellectual property are owned by PT Next Digital Mastery or its licensors. Nothing in these Terms grants you any right to use our trademarks, trade names, logos, or brand assets.

**Third-Party IP:** By importing GitHub, GitLab, or Bitbucket repositories, you represent that you have the right to include those repositories in your resume. Importing public repositories of which you are not the primary contributor solely for the purpose of misrepresentation is prohibited.

**Feedback:** Any feedback, suggestions, or ideas you provide about the Service may be used by us without obligation or compensation.`,
  },
  {
    id: "trash-restore",
    title: "Trash, Drafts, and Data Deletion",
    content: `**Trash Period:** When you delete an export, it is moved to a Trash state for 30 days. During this period, you may restore it for 0.5 credits. After 30 days, the export is permanently deleted and cannot be recovered.

**Drafts:** Saved drafts are stored server-side and persist indefinitely while your account is active. Loading a draft costs 0.5 credits.

**Account Deletion:** Upon deleting your account, all associated data — including resume data, drafts, exports, credit history, OAuth connections, and share tokens — are scheduled for permanent deletion within 30 days.

**No Recovery After Permanent Deletion:** Once data is permanently deleted (after the trash period or account deletion), we cannot recover it. Please export your data before deleting your account.`,
  },
  {
    id: "sharing",
    title: "Shared Resume Links",
    content: `**Nature of Shared Links:** Shareable links provide public, unauthenticated access to a specific snapshot of your resume. Anyone with the link can view and download the resume.

**Snapshots:** Each export linked to a share URL is an immutable snapshot — it represents your resume at the time of export and does not update automatically when you modify your resume.

**View and Download Tracking:** We track unique views using one-way device fingerprints (not personally identifiable) and download counts for each share link. This data is visible to you on your dashboard.

**Revocation:** You may delete a share link at any time. After deletion, the URL will return a 404 error. Snapshots that were downloaded prior to deletion are not recalled.

**Content Responsibility:** By sharing a resume link, you take responsibility for the content it contains. We are not liable for how recipients use or interpret shared resume content.`,
  },
  {
    id: "disclaimers",
    title: "Disclaimers and Limitation of Liability",
    content: `**No Employment Guarantee:** CurriCanvas does not guarantee that using our Service will result in employment, interview invitations, or any specific career outcome.

**ATS Compatibility:** While our ATS mode is designed to improve machine readability, we cannot guarantee compatibility with all proprietary ATS systems used by employers, as these vary significantly.

**AI Accuracy:** AI-generated content is probabilistic and may contain errors, hallucinations, or outdated information. We make no warranty regarding the accuracy or suitability of AI outputs for professional use.

**Service Availability:** We aim for high availability but do not guarantee uninterrupted access. Scheduled maintenance, infrastructure failures, or third-party service outages (including database, AI providers) may cause temporary unavailability.

**Limitation of Liability:** To the maximum extent permitted by applicable law, PT Next Digital Mastery shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or career damages, arising out of or relating to your use of the Service, even if we have been advised of the possibility of such damages.

**Total Liability Cap:** Our total aggregate liability to you for any claims arising from your use of the Service shall not exceed the greater of (a) the total credits you have purchased in the 3 months preceding the claim, valued at $0.50 per credit, or (b) $10 USD.`,
  },
  {
    id: "termination",
    title: "Termination",
    content: `**By You:** You may terminate your account at any time through your account settings.

**By Us:** We may suspend or terminate your account immediately and without prior notice if we determine, in our sole discretion, that you have violated these Terms, engaged in fraudulent activity, or pose a risk to the Service or other users.

**Effect of Termination:** Upon termination, your right to use the Service ceases immediately. Sections 5, 7, 10, and 12 survive termination.

**Refund Policy on Termination:** We do not provide refunds for purchased credits upon account termination due to Terms violations. Termination without cause entitles you to a pro-rata refund of unused purchased credits at our discretion.`,
  },
  {
    id: "governing-law",
    title: "Governing Law and Disputes",
    content: `These Terms are governed by and construed in accordance with the laws of the Republic of Indonesia, without regard to its conflict of law principles.

Any disputes arising out of or relating to these Terms or the Service shall first be submitted to good-faith negotiation. If unresolved within 30 days, disputes shall be settled by binding arbitration administered in Jakarta, Indonesia, and conducted in the Indonesian or English language.

Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent actual or threatened infringement of intellectual property rights.`,
  },
  {
    id: "support-tos",
    title: "Support",
    content: `Have a question about these Terms or need help with your account? Visit our Support page to choose from different support channels based on your needs — including direct contact, self-service guides, and account assistance.`,
    hasSupportLink: true,
  },
];
