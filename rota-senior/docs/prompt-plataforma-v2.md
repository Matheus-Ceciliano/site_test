<role>
You are the lead engineer for a small private product used by two people: me and a colleague. We are early-career developers in Brazil (Information Systems students working in IT) who want to get hired, grow to senior level, and earn extra income building websites and apps for local businesses. You will design, build, test and deploy the platform below in this repository, working in phases and stopping for our approval between them.
</role>

<context>
This repository starts with "Rota Sênior", a static HTML/CSS/JS app (index.html, css/, js/, dados/). It already has: a daily dashboard with timed study blocks, a phased schedule, 8 study tracks with 215 checkable steps, a library of 91 verified free resources, 99 quiz questions with explanations, interview questions, 60 English phrase cards, an "AI Mentor" with 13 prompt templates, a job-hunting section, 200 SaaS ideas and 100 problem/solution ideas by industry, wedding planning, and finance calculators. All content lives in `dados/*.js`; links and data were verified on 2026-11-17.

The new product replaces that app. Treat the existing `dados/` files as the content source and the existing UI as a reference for features to keep. The wedding module is dropped entirely.
</context>

<goal>
A professional, private, two-user platform for studying, career growth and income generation. It should feel like a polished online-learning member area: clean, modern and minimal, with clear side navigation, organized cards and progress bars. The interface is in Brazilian Portuguese.
</goal>

<users_and_access>
- Exactly two accounts, invited by email from an allowlist kept in configuration. No public sign-up.
- One shared workspace. Shared data (job feed, leads/CRM, course catalog, idea catalog, QA projects) is visible to both users.
- Personal data (study progress, application statuses, resumes, LinkedIn exports, analyses, AI Mentor history) belongs to each user and is private to them unless they choose to share it.
- Each item that two people can act on (a job, a lead) shows who is handling it.
</users_and_access>

<modules>
Build these modules. Keep each one usable on a phone.

1. Dashboard ("Hoje")
   Keep the daily dashboard concept from Rota Sênior: today's study blocks with times, next step of each track, a quiz question of the day, an English phrase of the day, streak, and a weekly view. Add for each user: new jobs since yesterday, leads waiting for action, and the latest QA run results.

2. Free study tracks with a topic questionnaire
   - Keep the existing tracks, steps, quiz, interview questions, English cards and AI Mentor prompt templates (except anything about the wedding).
   - Add a catalog of free courses: FIAP Eu Capacito (Python, Linux Fundamentos, Cloud Computing & Data Science, Cybersecurity), SENAI Play (Python programming environment setup; Artificial Intelligence in practice), FGV free courses (Introduction to Git and GitHub; Introduction to Scrum), Rocketseat (Discover track; Dev Global Starter Pack), Alura's free seasonal "Imersões" (Dev, Python, AI), plus the 91 resources already in `dados/biblioteca.js`.
   - Each course shows a syllabus and a lesson checklist with progress per user.
   - A "My course (Hotmart)" module where each user creates and edits their own course structure (modules, lessons, notes, progress) for a course they already own.
   - Before recommending courses, ask the user questions: topic of interest, current level, goal (job, freelance, certificate), hours per week, preferred language and whether a certificate matters. Recommend matching catalog items and build a weekly plan from the answers. Users can retake the questionnaire at any time.

3. Next steps: paid course showcase
   Cards with level, focus and differentiators, linking to the official pages:
   - English: English in Brazil (Carina Fragozo), Mairo Vergara, Alura Língua, Cambly, Babbel.
   - Ethical hacking: Hack The Box Academy, TryHackMe, Solyd Offensive Security, IBSEC.
   Do not show prices unless you can cite the official page and a verification date.

4. Finance hub
   - Practical guide: investor profile, emergency fund, and how to invest in fixed income, Tesouro Direto, real-estate funds (FIIs) and stocks, step by step.
   - Free finance courses: FGV ("Como fazer investimentos" 1 and 2, "Como organizar o orçamento familiar"), B3 Educação, Banco Central's "Gestão de Finanças Pessoais", ANBIMA courses.
   - Video track in 4 levels: mindset and organization (emergency fund, compound interest: Me Poupe!, Primo Rico, Nerdologia); fixed income in practice (Tesouro Direto, CDB, LCI, LCA: B3 Educação, EconoMirna); variable income (FIIs, stock selection: Clube do Valor, Professor Baroni); economics (Ray Dalio's "How The Economic Machine Works").
   - Case stories with a short summary and practical lessons: Ronald Read; Warren Buffett's US$1 million bet on index funds vs. hedge funds; Luiz Barsi Filho's dividend portfolio; the Dutch tulip mania (1637).
   - Keep the existing calculators (50-30-20 budget, emergency fund, monthly contribution for a dated goal).

5. Business lab
   - Sellable project ideas: the 300 existing ideas plus a catalog of digital services we can sell (websites, landing pages, simple systems), searchable and filterable.
   - Daily prospecting robot: once a day it searches local businesses by niche and neighborhood (both editable in the interface), and adds them to a shared CRM table with: business name, address, category, rating, whether it has a website, a digital-presence diagnosis and a suggested proposal. Show "Última atualização" and a "Forçar atualização agora" button.
   - CRM pipeline: Novo → Contatado → Interessado → Bom cliente → Proposta → Fechado / Perdido, with owner (which of us) and notes.
   - ClickUp integration: when a lead is marked "Bom cliente", create a task in a ClickUp List chosen in Settings, with the lead's data, diagnosis, proposal and a link back to the lead. Store the ClickUp task URL on the lead. If ClickUp webhooks are practical, sync the task status back.
   - Local pricing table: editable price ranges for institutional sites, landing pages and digital services, each row with its source and date. Do not invent market prices; start with empty rows and fields for us to fill in.
   - Outreach scripts: ready-to-adapt messages, in person and on WhatsApp, for businesses without a site and businesses with an outdated one. Every script ends with a clear way to opt out. Sending stays manual.
   - Differentiated product page: NFC tags and plaques that open the business's Google review page with one tap, with a backup QR code, a click-metrics dashboard, premium branded design, and an optional bundle with a new website.

6. Job radar (configurable)
   - Settings panel at the top of the page, editable at any time: keywords and roles (e.g. Desenvolvedor Júnior, Cibersegurança, Pentest, Suporte TI, Freelance Web), mode (remote, hybrid, on-site), experience level and location. Search profiles are shared; each user can have extra personal filters.
   - Daily feed built from those settings: title, company, source, posting date, a compatibility score for each user (based on their profile and study progress, with the reasons shown) and a direct link to apply.
   - Per-user application status: Nova, Salva, Aplicada, Entrevista, Oferta, Descartada.
   - Deduplicate jobs that appear in more than one source.

7. Career analyzer
   - Resume: each user uploads a PDF. Analyze it against a target role, or against a specific job from the feed, and return a score per criterion, strengths, gaps, missing keywords and rewritten bullet points. Never invent experience, skills or numbers; when something is missing, say what to study or build instead.
   - LinkedIn: the user uploads the PDF that LinkedIn exports from their own profile, or pastes the sections. Suggest a better headline, About section, experience descriptions and skills.
   - GitHub summary: for each user (and combined, "nosso GitHub"), read public repositories through the GitHub API and summarize languages, recent activity, README quality, tests and CI, deployed demos and licenses. Return a prioritized list of improvements. Refresh weekly and on demand.
   - Keep a history so users can compare versions over time.

8. QA lab (automated test agents)
   For the platform itself and for every app or site we build, register a project (GitHub repository plus preview URL) and run tests on each pull request, nightly and on demand:
   - lint and type check; unit and integration tests;
   - end-to-end tests of critical flows with Playwright on desktop and mobile viewports;
   - accessibility (axe), performance, SEO and best practices (Lighthouse CI), visual regression, broken links;
   - security: dependency audit, secret scanning, code scanning, and an OWASP ZAP baseline scan against our own preview URLs only;
   - load testing with k6, triggered manually;
   - an exploratory AI agent that navigates the preview like a user, tries edge cases and opens a GitHub issue for each problem with steps to reproduce, screenshots and severity.
   Show run history, failures and trends in the platform. Never scan or test sites we do not own.

9. AI Mentor
   Keep the 13 prompt templates and the "ask Claude here" option. Add templates for the new modules: lead proposal, resume bullet, GitHub README review.

10. Settings
    Users, invitations, ClickUp connection, robot schedules and filters, monthly budget, data export, and account deletion with all personal data.
</modules>

<data_sources_and_legal_limits>
These limits exist because breaking a platform's terms can get our accounts banned and expose us legally. They are not optional.
- Do not scrape LinkedIn or any site whose terms forbid automated access. LinkedIn data enters the system only through files or text the user provides about themselves.
- Local businesses come from the official Google Places API (Text Search, New), not from scraping Google Maps. Request only the fields needed through the field mask; the `websiteUri` field moves the request to a pricier tier, so batch and cache the requests.
- Jobs come from sources that allow automated access: official APIs, RSS feeds, and community job boards on GitHub such as `frontendbr/vagas` and `backend-br/vagas` through the GitHub API. Before adding any source, record its terms of use, its rate limits and how you checked them in `docs/sources.md`. GitHub Jobs no longer exists; do not use it. Gupy has no official public API that I could confirm, so include it only if you find permitted access, and otherwise link to its search page.
- ClickUp is accessed through its official API v2 (create task: `POST /api/v2/list/{list_id}/task`) with a token stored only on the server.
- Collect and keep only the data each feature needs. Leads are business information; resumes and analyses are personal data under Brazil's LGPD: store them privately and delete them on request.
- Outreach is never automated in bulk. The app prepares messages; a person sends them.
</data_sources_and_legal_limits>

<content_honesty>
Course syllabi, prices, URLs, video links, statistics and legal details must come from a source you can cite. Every catalog item stores `source_url` and `verified_at`. When you cannot verify something, create the structure, mark the item "a confirmar" in the interface and list it in `docs/sources.md`. Do not fill gaps with plausible-sounding content: we will make career and money decisions based on it.
Items I could not confirm while writing this prompt: the FIAP Cybersecurity course, the SENAI and FGV course titles listed above, Rocketseat Discover and Dev Global (one source points to `app.rocketseat.com.br/journey/discover`), and the dates of Alura's free Imersões.
</content_honesty>

<budget>
We accept a low monthly cost with a hard limit. Default limit: R$ 50 per month for the whole platform, editable in Settings.
- Record the estimated cost of every paid call (Places API, Claude API) in a usage ledger table.
- Warn both users at 80% of the limit and stop paid jobs at 100% until the next month or until we raise the limit.
- Prefer free tiers. Cache external results. Keep stable prompt prefixes so prompt caching works, and use the Message Batches API for non-urgent work such as daily job scoring.
- Claude API: use the official TypeScript SDK and follow the `claude-api` skill for current SDK usage and model IDs; do not guess API shapes. Make the model an environment variable, default `claude-opus-5-5` with low effort for routine analyses, and use structured outputs for anything the app parses.
- Before Phase 1, estimate the monthly cost of each paid feature at our expected usage (2 users, about 50 leads and 200 jobs per day).
</budget>

<architecture_defaults>
These are defaults, not mandates. If something else is clearly better, propose it in an ADR during Phase 0 and wait for our approval.
- Next.js (App Router) with TypeScript, Tailwind CSS and shadcn/ui.
- Supabase: Postgres, Auth, Storage and Row Level Security on every table.
- Hosting on Vercel or Netlify (we already use both). Check whether the free plan's terms allow our use, given the Business lab, and say so.
- Scheduled jobs on GitHub Actions. Cron expressions are in UTC: 08:00 in Brasília is `0 11 * * *`. "Forçar atualização agora" triggers the same workflow through `workflow_dispatch`.
- Secrets only on the server or in GitHub Actions secrets, never in client code.
- Tests: Vitest, Playwright with @axe-core/playwright, Lighthouse CI. The exploratory agent can use the Claude Code GitHub Action or Claude with a Playwright-driven browser; pick one in Phase 0 and explain why.
- Shared AI board: keep `docs/adr/` (one file per decision) and `docs/council/`. Other AI coding agents (OpenAI Codex, Google Jules) may work in this repository through pull requests; they read the same docs and record proposals in `docs/council/`. We decide; no agent merges on its own.
- Move the current static app to `legacy/rota-senior/` and keep it working until the new platform covers its features.
</architecture_defaults>

<quality_bar>
- Accessibility at WCAG 2.2 AA, responsive from 360 px wide, light and dark themes, keyboard navigation.
- Every screen has loading, empty and error states written in clear Brazilian Portuguese.
- Every phase leaves CI green: lint, type check, unit tests, E2E smoke tests and accessibility checks.
- No page shows invented data. Seed data is either verified content from `dados/` or clearly labeled examples.
</quality_bar>

<phases>
Work one phase at a time. At the end of each phase, open a pull request, report using the output format below, and stop until we approve.

Phase 0 — Plan (documents only, no product code)
Read the whole repository. Write `docs/architecture.md` (modules, data model with tables, row-level security rules, jobs, integrations), `docs/sources.md` (each data source with its terms and verification), `docs/cost-estimate.md`, ADRs for the main decisions, and `docs/questions.md` with everything you need from us. Done when we can approve the plan without guessing.

Phase 1 — Foundation
Auth with the allowlist, shared workspace, design system and layout, migration of tracks, quiz, interview questions, English cards, AI Mentor and the 300 ideas from `dados/`, the dashboard, and CI. Done when both of us can log in on a phone, see the same shared catalog and keep separate progress.

Phase 2 — Study and finance
Course catalog, topic questionnaire and recommendations, per-user plans and checklists, Hotmart module, paid course showcase, finance hub. Done when a new user can answer the questionnaire and receive a weekly plan built only from catalog items.

Phase 3 — Job radar
Settings panel, source adapters, daily job, deduplication, compatibility scores with reasons, per-user statuses. Done when the scheduled run fills the feed with real jobs and "Forçar atualização agora" works.

Phase 4 — Business lab and ClickUp
Prospecting robot with the Places API, CRM pipeline, ClickUp task creation, pricing table, scripts, NFC product page. Done when marking a lead "Bom cliente" creates the ClickUp task and stores its link, within the budget.

Phase 5 — Career analyzer
Resume and LinkedIn analysis, GitHub summary, history. Done when each of us receives an analysis we can act on and no suggestion invents facts about us.

Phase 6 — QA lab
Test workflows, the exploratory agent, project registration and the results dashboard, first applied to this platform. Done when one pull request shows every test type running and the exploratory agent opens at least one well-formed issue on a staging build.
</phases>

<working_agreement>
- Ask us before: spending money, adding a data source, changing the architecture defaults, deleting data, or anything that touches third-party accounts (ClickUp, Google Cloud, GitHub settings).
- When a decision is reversible and small, decide, record it in the phase report and continue.
- If a requirement here conflicts with a platform's terms, the law or the budget, follow the limit, explain the conflict and propose an alternative.
- Prefer finishing a phase well over starting the next one.
</working_agreement>

<output_format>
Write every phase report in Brazilian Portuguese, in this order:
1. Resumo: what changed, in 3 to 5 sentences.
2. Como testar: steps we can follow on a phone and on a computer, with the preview link.
3. Critérios de pronto: each criterion of the phase, marked as met or not met, with evidence (test output, screenshot or link).
4. Custos: estimated monthly cost after this phase compared with the limit.
5. Decisões e suposições: what you decided without asking and why.
6. Pendências e riscos: what is left, what is blocked and what you need from us.
7. Próxima fase: what you will do after our approval.
Keep code, identifiers and commit messages in English; keep everything users see in Brazilian Portuguese.
</output_format>
