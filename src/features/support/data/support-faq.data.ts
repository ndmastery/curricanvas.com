export interface FAQItem { question: string; answer: string; }
export interface FAQCategory { id: string; title: string; icon: string; items: FAQItem[]; }

export const FAQ_DATA: FAQCategory[] = [
  {
    id: "getting-started", title: "Getting Started",
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    items: [
      { question: "How do I create a CurriCanvas account?", answer: "You can sign up using one of four OAuth providers — GitHub, Google, GitLab, or Bitbucket. Simply click \"Start Free\" on the homepage and choose your preferred provider. No forms, no passwords — just authorize the OAuth connection and you're in." },
      { question: "Do I need a credit card to get started?", answer: "No. CurriCanvas offers a free tier that includes 3 credits per month, resetting every 30 days. You never need a credit card to create an account or start building your resume." },
      { question: "What happens after I sign up?", answer: "After OAuth sign-in, you'll land on the Complete Profile page where you set a unique username and upload an avatar. Once that's done, you're taken directly to the resume editor with a blank canvas ready to fill." },
      { question: "Can I try CurriCanvas before signing up?", answer: "The landing page at curricanvas.com showcases every feature, section, and capability in detail. To actually build and export a resume, you'll need to create a free account — but it takes under 30 seconds via OAuth." },
    ],
  },
  {
    id: "resume-editor", title: "Resume Editor",
    icon: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
    items: [
      { question: "What sections can I add to my resume?", answer: "CurriCanvas supports 15+ structured sections: Profile, Contact (50+ platforms), About, Education, Positions, Tech Stack / Skills, Certificates, Community, Publications, Portfolio, Repositories, Languages, Courses, and References. Each section is fully editable with a dedicated form." },
      { question: "How does the Markdown editor work?", answer: "The About, Education, Portfolio, and Positions sections include a built-in Markdown editor with a formatting toolbar, syntax highlighting, and live preview. You can write rich descriptions using standard Markdown syntax — bold, italic, links, lists, code blocks, and more." },
      { question: "Can I reorder sections on my resume?", answer: "Yes. All list-based sections support drag-to-reorder. You can drag section handles to rearrange the order in which sections appear on your exported resume. This lets you prioritize Skills over Education (or vice versa) depending on the role you're targeting." },
      { question: "What is AI Resume Import?", answer: "AI Resume Import lets you upload an existing resume file. CurriCanvas's AI — powered by the most advanced available model (Claude, GPT, or Gemini) — parses and optimizes the entire content into structured sections: About, Skills, Positions, Portfolio, and more. It costs 3 credits per import." },
      { question: "Can I import my resume from LinkedIn?", answer: "Yes. Provide your public LinkedIn profile URL and our AI will generate and optimize relevant data into a polished, ATS-ready resume format. The same AI models process and structure the information into CurriCanvas sections automatically." },
    ],
  },
  {
    id: "export-sharing", title: "Export & Sharing",
    icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
    items: [
      { question: "What export formats does CurriCanvas support?", answer: "CurriCanvas supports PDF, PNG, and DOCX exports. All exports are rendered server-side with a fixed rendering environment, so the result is pixel-perfect and identical on every device, OS, and screen. You can also download all formats together as a ZIP bundle." },
      { question: "What is the ATS Resume Mode?", answer: "ATS (Applicant Tracking System) mode generates a clean, scanner-friendly layout that strips columns, graphics, icons, and decorative fonts that confuse automated resume screening systems. You can toggle between Professional and ATS views directly on the resume page." },
      { question: "How do shareable resume links work?", answer: "When you export a resume, CurriCanvas generates a unique token-based URL that anyone can view without logging in. The link is backed by an immutable snapshot — meaning your shared link never breaks, even if you update your resume later." },
      { question: "What is unique view tracking?", answer: "Each shareable resume page tracks unique visitors using device fingerprinting (FNV-1a hash). This is a one-way hash that cannot be reversed to identify anyone personally. No cookies and no tracking scripts are used." },
      { question: "Can visitors download my resume from the shared link?", answer: "Yes. Anyone visiting your public resume page can preview and download your resume in any available format (PDF, PNG, DOCX) and any theme variant (Light, Dark, Black). Every download is counted and displayed alongside the view count." },
    ],
  },
  {
    id: "credits-billing", title: "Credits & Billing",
    icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    items: [
      { question: "How does the credit system work?", answer: "CurriCanvas uses a credit-based system. Every account receives 3 free credits at the start of each 30-day cycle. Credits are deducted when you perform certain actions — exporting costs 1 credit, loading a saved export or draft costs 0.5 credits, restoring from trash costs 0.5 credits, AI import costs 3 credits, and AI section polish costs 0.5 credits." },
      { question: "How much does it cost to top up credits?", answer: "Credits are available at $0.50 per credit. There are no subscriptions and no hidden fees — you pay only when you need more." },
      { question: "What's included in the free tier?", answer: "The Always Free tier includes: full resume editor access, 3 credits that reset every 30 days, PDF/PNG/DOCX export, free shareable resume links, all 15+ resume sections, GitHub/GitLab/Bitbucket import, and community support. No credit card required." },
      { question: "Can I see my credit transaction history?", answer: "Yes. Every deduction and top-up is logged in your Credit Transaction History with the action type, credit amount, timestamp, and remaining balance." },
      { question: "When do my free credits reset?", answer: "Free credits reset every 30 days from your initial cycle start date. Top-up credits never expire — they persist indefinitely until used." },
    ],
  },
  {
    id: "integrations", title: "Integrations",
    icon: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    items: [
      { question: "Which platforms can I connect for repository import?", answer: "CurriCanvas supports GitHub, GitLab, and Bitbucket via OAuth. Once connected, you can import repositories, auto-detect your tech stack, sync repos on demand, toggle selections, and include or exclude forks." },
      { question: "Is my OAuth data stored securely?", answer: "Yes. OAuth tokens are exchanged via server-side callbacks and never exposed to client-side JavaScript. Tokens are encrypted at rest and stored with per-user row-level security (RLS) policies in the database." },
      { question: "What happens if I have no repositories to import?", answer: "If your connected platform account has zero repositories, CurriCanvas shows a polished empty-state card with clear messaging and a suggestion to try re-syncing." },
    ],
  },
  {
    id: "themes-appearance", title: "Themes & Appearance",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
    items: [
      { question: "What themes are available?", answer: "CurriCanvas offers three themes: Light (clean white for print), Dark (deep navy for comfortable editing), and Pure Black (true #000000 for OLED screens). There's also a System option that follows your OS preference." },
      { question: "Can I export my resume in different themes?", answer: "Yes. When exporting, you can choose the theme variant — Light, Dark, or both. The export engine renders your resume server-side with pixel-perfect fidelity." },
      { question: "What is the Pure Black / OLED mode?", answer: "Pure Black mode uses a true #000000 background. On OLED and AMOLED screens, black pixels are turned completely off, which saves significant battery life and dramatically reduces eye strain in dark environments." },
    ],
  },
  {
    id: "drafts-history", title: "Drafts & History",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-4 0h4",
    items: [
      { question: "How does draft auto-save work?", answer: "CurriCanvas uses server-side draft management with smart diff detection. Your work is automatically saved as drafts at regular intervals. Before saving, the system compares draft data to avoid redundant writes." },
      { question: "Can I restore a previously exported resume?", answer: "Yes. Every export is permanently saved in your Export History. You can browse, re-download, or load any previously exported resume's snapshot back into the editor. Loading costs 0.5 credits." },
      { question: "What happens when I delete an export?", answer: "Deleted exports enter a 30-day trash period. During this time, you can restore them for 0.5 credits. After 30 days, they are permanently purged." },
    ],
  },
  {
    id: "privacy-security", title: "Privacy & Security",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    items: [
      { question: "How is my data protected?", answer: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3+). Every database table is protected by PostgreSQL Row-Level Security (RLS) policies — each user can only access their own rows, enforced at the database level." },
      { question: "Does CurriCanvas use cookies or tracking scripts?", answer: "No. The landing site uses localStorage (not cookies) to remember your theme and locale preferences. No tracking cookies, no third-party advertising, and no analytics SDKs are embedded." },
      { question: "How does device fingerprinting work for view counting?", answer: "When someone views your shared resume, CurriCanvas generates a device fingerprint using the FNV-1a hashing algorithm. This produces a one-way hash that cannot be reversed to identify anyone personally." },
    ],
  },
  {
    id: "custom-domain", title: "Custom Domain",
    icon: "M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9",
    items: [
      { question: "Can I use my own domain for my resume?", answer: "Yes. CurriCanvas supports custom domain mapping. You can point your own domain (e.g., resume.yourdomain.com) to your CurriCanvas profile by configuring DNS records." },
      { question: "How much does custom domain cost?", answer: "Custom domain mapping costs 999 credits. This is a one-time fee that permanently links your domain to your CurriCanvas profile." },
    ],
  },
  {
    id: "ai-features", title: "AI Features",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 10 14.117l-.548-.548z",
    items: [
      { question: "Which AI models does CurriCanvas use?", answer: "CurriCanvas uses multiple leading AI providers — Anthropic Claude, OpenAI GPT, and Google Gemini. The system selects the best available model for each task." },
      { question: "What can I do with AI features?", answer: "Two main AI capabilities: (1) AI Resume Import — upload an existing resume or paste a LinkedIn URL, and AI generates a fully structured CurriCanvas resume (3 credits). (2) AI Section Polish — ask AI to rewrite any individual section with recruiter-grade language (0.5 credits per save)." },
    ],
  },
];

export const totalAll = FAQ_DATA.reduce((sum, cat) => sum + cat.items.length, 0);

const STOP = new Set(["a","an","the","is","it","to","of","in","on","for","and","or","by","my","i","do","can","how","what","are","you","your"]);
const ALL_WORDS: string[] = (() => {
  const set = new Set<string>();
  FAQ_DATA.forEach((c) => c.items.forEach((i) => {
    `${i.question} ${i.answer}`.toLowerCase().replace(/[^a-z0-9\s-]/g, "").split(/\s+/).forEach((w) => {
      if (w.length >= 3 && !STOP.has(w)) set.add(w);
    });
  }));
  return [...set].sort();
})();

function editDist(a: string, b: string): number {
  if (a.length > b.length) [a, b] = [b, a];
  const row = Array.from({ length: a.length + 1 }, (_, i) => i);
  for (let j = 1; j <= b.length; j++) {
    let prev = row[0]; row[0] = j;
    for (let i = 1; i <= a.length; i++) {
      const tmp = row[i];
      row[i] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, row[i], row[i - 1]);
      prev = tmp;
    }
  }
  return row[a.length];
}

function findSmartSuggestions(q: string): string[] {
  const t = q.toLowerCase().trim();
  if (t.length < 2) return [];
  const scored: { w: string; s: number }[] = [];
  for (const w of ALL_WORDS) {
    if (w === t) continue;
    let s = 99;
    if (w.startsWith(t)) s = 0;
    else if (w.includes(t)) s = 1;
    else if (t.length >= 3) { const d = editDist(t, w); if (d <= 2) s = 2 + d; }
    if (s < 99) scored.push({ w, s });
  }
  scored.sort((a, b) => a.s - b.s || a.w.localeCompare(b.w));
  return scored.slice(0, 8).map((x) => x.w);
}
