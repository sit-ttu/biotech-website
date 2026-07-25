# Biotech TTU Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the copied SIT monorepo into a clean, bilingual Biotech TTU website with a redesigned public frontend, empty CMS data, a migrated `biotech_db`, and one initial administrator.

**Architecture:** Retain the existing Next.js public app, Next.js dashboard, NestJS API, Drizzle schema, and responsive header behavior. Rebrand shared metadata and translations first, then reshape the existing homepage components into the approved rounded modular design, update backend/dashboard identity, and finally initialize only the already-created `biotech_db`.

**Tech Stack:** pnpm workspaces, Next.js 16, React 19, TypeScript, Tailwind CSS 4, NestJS 11, Drizzle ORM, PostgreSQL 17 in Docker, Playwright/agent-browser for visual checks.

## Global Constraints

- Use Ponytail full mode: reuse existing components, add no dependencies, and keep diffs directly tied to the rebrand.
- Keep `/vi` and `/en`, the existing CMS schema, dashboard, authentication, search, language switcher, and responsive header behavior.
- Use `https://biotech.ttu.edu.vn` as the canonical public origin.
- Use `secretary.sbio@ttu.edu.vn`, `(+84) 076 436 2098`, and `(+84) 272 376 9216` as official Biotech contacts.
- Display Biotechnology and High-Tech Agriculture as the two default programs.
- Leave all CMS-managed content collections empty.
- Delete committed SIT backups and uploaded files, but do not delete any database other than the new empty `biotech_db`.
- Never commit or print the administrator password.
- Do not deploy, push, change DNS, or alter production infrastructure.
- Preserve the pre-existing uncommitted edits in `.env.shared.example` and
  `pnpm-workspace.yaml`; incorporate them only when a task explicitly needs the
  same file and never discard them.

---

## File Map

**Delete**

- `backend/backups/db-backup-2026-07-21T03-31-21-000Z/`
- All committed files under `backend/uploads/`
- `app/public/assets/logo-sit.png`
- `app/public/assets/logo-sit-no-bg.png`
- `dashboard/public/assets/logo-sit.png`
- SIT-specific images under `app/public/assets/programs/`

**Create**

- `app/public/assets/biotech/logo-biotech.png` — official header logo.
- `app/public/assets/biotech/logo-biotech-footer.png` — official horizontal footer logo.
- `app/public/assets/biotech/hero-biotechnology.png` — official Biotech hero image.
- `app/public/assets/biotech/research-biotechnology.png` — official research image.
- `backend/uploads/.gitignore` — keep future runtime uploads out of Git.

**Primary public-app modifications**

- `app/src/messages/vi.json`
- `app/src/messages/en.json`
- `app/src/lib/seo.ts`
- `app/src/lib/program-seo.ts`
- `app/src/components/SiteIdentityJsonLd.tsx`
- `app/src/components/Header.tsx`
- `app/src/components/Footer.tsx`
- `app/src/components/HomePageContent.tsx`
- `app/src/components/Hero.tsx`
- `app/src/components/Mission.tsx`
- `app/src/components/Programs.tsx`
- `app/src/components/ResearchAreas.tsx`
- `app/src/components/FacultyHighlight.tsx`
- `app/src/components/News.tsx`
- `app/src/components/CtaBanner.tsx`
- `app/src/app/globals.css`
- `app/src/app/layout.tsx`
- `app/src/app/manifest.ts`
- `app/src/app/vi/page.tsx`
- `app/src/app/en/page.tsx`

**Secondary public-app modifications**

- Every tracked text file reported by:

```bash
rg -l -i 'school of information technology|khoa công nghệ thông tin|\bSIT\b|sit\.ttu\.edu\.vn|sit@ttu\.edu\.vn|#BA4811' app \
  --glob '!**/.next/**' --glob '!**/node_modules/**'
```

**Backend/dashboard/repository modifications**

- `backend/.env.example`
- `backend/README.md`
- `backend/src/app.controller.ts`
- `backend/src/app.dto.ts`
- `backend/src/main.ts`
- `backend/db/schema.ts`
- `dashboard/src/app/globals.css`
- `dashboard/src/app/layout.tsx`
- `dashboard/src/app/login/page.tsx`
- `dashboard/src/components/layout/Header.tsx`
- `dashboard/src/components/layout/Sidebar.tsx`
- `README.md`
- `package.json`
- `.env.shared.example`
- `deploy.sh`
- `ecosystem.config.js`
- `.github/workflows/deploy.yml`
- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/config.yml`
- `SECURITY.md`

---

### Task 1: Remove committed SIT data and establish clean runtime directories

**Files:**

- Delete: `backend/backups/db-backup-2026-07-21T03-31-21-000Z/`
- Modify: `backend/backups/.gitignore`
- Delete: all tracked files under `backend/uploads/`
- Create: `backend/uploads/.gitignore`

**Interfaces:**

- Consumes: Existing upload service paths under `backend/uploads`.
- Produces: Empty ignored runtime directories that the existing backend can recreate and write into.

- [ ] **Step 1: Capture the exact deletion baseline**

Run:

```bash
git status --short
find backend/backups -type f -print | sort
find backend/uploads -type f -print | sort
du -sh backend/backups backend/uploads
```

Expected: status includes the implementation-plan file plus the existing
`.env.shared.example` and `pnpm-workspace.yaml` edits; inventory shows three
backup files and 167 uploaded files.

- [ ] **Step 2: Remove old backup and upload content**

Run:

```bash
find backend/backups -mindepth 1 ! -name .gitignore -delete
find backend/uploads -mindepth 1 -delete
```

Expected: no database dumps, SQL backups, PDFs, or images remain.

- [ ] **Step 3: Replace ignore rules with clean runtime rules**

Set `backend/backups/.gitignore` to:

```gitignore
*
!.gitignore
```

Create `backend/uploads/.gitignore` with:

```gitignore
*
!.gitignore
```

- [ ] **Step 4: Verify the cleanup**

Run:

```bash
test "$(find backend/backups -type f ! -name .gitignore | wc -l | tr -d ' ')" = 0
test "$(find backend/uploads -type f ! -name .gitignore | wc -l | tr -d ' ')" = 0
git diff --check
```

Expected: all commands exit zero.

- [ ] **Step 5: Commit the cleanup**

```bash
git add backend/backups backend/uploads
git commit -m "chore: remove legacy SIT data"
```

---

### Task 2: Install official Biotech assets and global brand identity

**Files:**

- Create: `app/public/assets/biotech/logo-biotech.png`
- Create: `app/public/assets/biotech/logo-biotech-footer.png`
- Create: `app/public/assets/biotech/hero-biotechnology.png`
- Create: `app/public/assets/biotech/research-biotechnology.png`
- Delete: `app/public/assets/logo-sit.png`
- Delete: `app/public/assets/logo-sit-no-bg.png`
- Delete: `dashboard/public/assets/logo-sit.png`
- Modify: `app/src/lib/seo.ts`
- Modify: `app/src/lib/program-seo.ts`
- Modify: `app/src/components/SiteIdentityJsonLd.tsx`
- Modify: `app/src/app/layout.tsx`
- Modify: `app/src/app/manifest.ts`
- Modify: `app/src/app/vi/page.tsx`
- Modify: `app/src/app/en/page.tsx`
- Modify: `app/src/messages/vi.json`
- Modify: `app/src/messages/en.json`

**Interfaces:**

- Consumes: Existing metadata helpers and `next-intl` message namespaces.
- Produces: Canonical Biotech constants and message values consumed by all routes and shared components.

- [ ] **Step 1: Download official source assets**

Run:

```bash
mkdir -p app/public/assets/biotech
curl -L 'https://biotech.ttu.edu.vn/wp-content/uploads/2018/03/logo-bio2.png' -o app/public/assets/biotech/logo-biotech.png
curl -L 'https://biotech.ttu.edu.vn/wp-content/uploads/2018/03/LOGO-BIO-VN1.png' -o app/public/assets/biotech/logo-biotech-footer.png
curl -L 'https://biotech.ttu.edu.vn/wp-content/uploads/2021/08/CNSH.png' -o app/public/assets/biotech/hero-biotechnology.png
curl -L 'https://biotech.ttu.edu.vn/wp-content/uploads/2026/07/Gemini_Generated_Image_24jmbs24jmbs24jm-2-768x463.png' -o app/public/assets/biotech/research-biotechnology.png
file app/public/assets/biotech/*
```

Expected: four valid PNG images, not HTML error pages.

- [ ] **Step 2: Remove SIT-specific public assets**

Run:

```bash
rm app/public/assets/logo-sit.png app/public/assets/logo-sit-no-bg.png
rm dashboard/public/assets/logo-sit.png
rm -rf app/public/assets/programs
```

- [ ] **Step 3: Replace canonical identity**

Set shared values to:

```ts
export const SITE_URL = "https://biotech.ttu.edu.vn";
export const DEFAULT_CONTENT_IMAGE =
  "/assets/biotech/hero-biotechnology.png";
```

Use these localized names consistently:

```ts
const names = {
  vi: "Khoa Công nghệ Sinh học - Đại học Tân Tạo",
  en: "School of Biotechnology - Tan Tao University",
};
```

Update JSON-LD organization URL, logo, email, phone, address, and `sameAs`.

- [ ] **Step 4: Rewrite default bilingual messages**

Replace SIT-specific message values with official Biotech copy. At minimum,
rewrite these namespaces in both locale files:

```text
metadata
header
hero
stats
programs
about
research
faculty
news
cta
footer
contact
```

Default programs must be:

```json
[
  {
    "code": "7420201",
    "vi": "Công nghệ Sinh học",
    "en": "Biotechnology",
    "duration": "4 năm",
    "credits": "130 tín chỉ"
  },
  {
    "code": "",
    "vi": "Nông nghiệp công nghệ cao",
    "en": "High-Tech Agriculture",
    "duration": "4 năm",
    "credits": ""
  }
]
```

Do not add default news, faculty, publications, achievements, alumni, or student
activity records.

- [ ] **Step 5: Validate message and metadata files**

Run:

```bash
node -e 'JSON.parse(require("fs").readFileSync("app/src/messages/vi.json")); JSON.parse(require("fs").readFileSync("app/src/messages/en.json")); console.log("messages ok")'
rg -n -i 'school of information technology|khoa công nghệ thông tin|sit\.ttu\.edu\.vn|sit@ttu\.edu\.vn' \
  app/src/lib app/src/app/layout.tsx app/src/app/manifest.ts app/src/app/vi/page.tsx app/src/app/en/page.tsx app/src/messages
```

Expected: JSON validation passes and `rg` returns no matches.

- [ ] **Step 6: Commit the brand foundation**

```bash
git add app/public/assets app/src/lib app/src/components/SiteIdentityJsonLd.tsx app/src/app app/src/messages dashboard/public/assets
git commit -m "feat: establish Biotech TTU identity"
```

---

### Task 3: Rebrand the shared header and footer without changing their behavior

**Files:**

- Modify: `app/src/components/Header.tsx`
- Modify: `app/src/components/Footer.tsx`
- Modify: `app/src/components/ModalSearchGlobal.tsx`
- Modify: `app/src/components/PopupBannerModal.tsx`
- Modify: `app/src/app/globals.css`

**Interfaces:**

- Consumes: Existing `header`, `footer`, and program message namespaces plus the existing API clients.
- Produces: The same component exports and route behavior with Biotech identity and palette.

- [ ] **Step 1: Preserve the current navigation contract**

Keep the existing component props, responsive overlay state, search behavior,
language switcher, CMS program fetch, and route generation unchanged.

Change only visible brand and styling:

```text
Logo: /assets/biotech/logo-biotech.png
Primary: #16856F
Primary dark: #0D5E50
Mint background: #E8F3EF
Ink: #12312B
Warm white: #F8FAF7
Radius: 20-28px for large surfaces
```

- [ ] **Step 2: Replace header/footer links and labels**

Use:

```text
Facebook: https://www.facebook.com/biotechnology.biotechnology.357
Email: secretary.sbio@ttu.edu.vn
Public site: https://biotech.ttu.edu.vn
Admissions: https://tuyensinh.ttu.edu.vn/
```

Keep CMS-generated program menu sections empty when the API returns no records.
Static navigation still exposes the two official program overview routes.

- [ ] **Step 3: Remove orange literals from shared surfaces**

Run after editing:

```bash
rg -n -i '#BA4811|#ba4911|#b74717|#a84316|#96380d' \
  app/src/components/Header.tsx app/src/components/Footer.tsx \
  app/src/components/ModalSearchGlobal.tsx app/src/components/PopupBannerModal.tsx \
  app/src/app/globals.css
```

Expected: no matches.

- [ ] **Step 4: Build the public app**

Run:

```bash
pnpm --filter frontend build
```

Expected: Next.js build exits zero.

- [ ] **Step 5: Commit the shared-shell rebrand**

```bash
git add app/src/components/Header.tsx app/src/components/Footer.tsx \
  app/src/components/ModalSearchGlobal.tsx app/src/components/PopupBannerModal.tsx \
  app/src/app/globals.css
git commit -m "feat: rebrand public navigation"
```

---

### Task 4: Implement the approved rounded modular Biotech homepage

**Files:**

- Modify: `app/src/components/HomePageContent.tsx`
- Modify: `app/src/components/Hero.tsx`
- Modify: `app/src/components/Mission.tsx`
- Modify: `app/src/components/Programs.tsx`
- Modify: `app/src/components/ResearchAreas.tsx`
- Modify: `app/src/components/FacultyHighlight.tsx`
- Modify: `app/src/components/News.tsx`
- Modify: `app/src/components/CtaBanner.tsx`
- Modify: `app/src/components/Achievements.tsx`
- Modify: `app/src/components/TextRibbon.tsx`

**Interfaces:**

- Consumes: Existing API clients and translation namespaces.
- Produces: The same default component exports with CMS-aware empty states and the new homepage composition.

- [ ] **Step 1: Simplify homepage composition**

Render sections in this exact order:

```tsx
<Hero />
<Mission />
<Programs />
<ResearchAreas />
<FacultyHighlight />
<News />
<CtaBanner />
```

Remove `TextRibbon` and `Achievements` from the homepage composition because
their old fallback content is SIT data. Keep their route-level components only
where still used.

- [ ] **Step 2: Convert the hero to a restrained modular layout**

Reuse the existing motion and reduced-motion logic. Build:

- A rounded primary image panel using
  `/assets/biotech/hero-biotechnology.png`.
- A pale-mint content card with the official school introduction.
- One dark-teal research card and one small program-code card.
- Existing admissions and introduction CTAs.
- At most four visual panels on desktop and a single-column order on mobile.

Do not reproduce the highly fragmented reference mosaic.

- [ ] **Step 3: Reuse `Mission` for the official introduction**

Keep the component name/export and replace the unused old route with the valid
localized about route:

```ts
const href =
  locale === "vi" ? "/vi/gioi-thieu-chung" : "/en/about-us";
```

Use official introduction copy from the locale messages.

- [ ] **Step 4: Make programs work with an empty CMS**

Retain API fetching, but set the fallback to exactly two official program cards.
Remove all IT topic-image mappings and use:

```ts
const FALLBACK_IMAGE = "/assets/biotech/research-biotechnology.png";
```

Update Course JSON-LD to the Biotech canonical origin and provider name.

- [ ] **Step 5: Make CMS sections intentionally empty**

For `FacultyHighlight`, `News`, and `Achievements`:

```tsx
if (!loading && items.length === 0) return null;
```

Do not inject hardcoded people, posts, publications, awards, or statistics.
Keep accessible loading states while the API request is pending.

- [ ] **Step 6: Restyle research and CTA sections**

Use the approved palette, 20-28px major radii, official research image, readable
academic typography, and existing route links. Preserve reduced-motion behavior.

- [ ] **Step 7: Build and inspect the homepage**

Run:

```bash
pnpm --filter frontend build
```

Then serve the app and capture:

```bash
pnpm --filter frontend start
agent-browser --session biotech-local open http://localhost:3000/vi
agent-browser --session biotech-local set viewport 1440 1000
agent-browser --session biotech-local screenshot --full /private/tmp/biotech-home-desktop.png
agent-browser --session biotech-local set viewport 390 844
agent-browser --session biotech-local screenshot --full /private/tmp/biotech-home-mobile.png
```

Expected: no horizontal overflow, header behavior remains familiar, and the
homepage visibly follows the approved rounded modular direction.

- [ ] **Step 8: Commit the homepage**

```bash
git add app/src/components/HomePageContent.tsx app/src/components/Hero.tsx \
  app/src/components/Mission.tsx app/src/components/Programs.tsx \
  app/src/components/ResearchAreas.tsx app/src/components/FacultyHighlight.tsx \
  app/src/components/News.tsx app/src/components/CtaBanner.tsx \
  app/src/components/Achievements.tsx app/src/components/TextRibbon.tsx
git commit -m "feat: redesign Biotech homepage"
```

---

### Task 5: Remove remaining SIT identity from public routes and components

**Files:**

- Modify: every remaining tracked text file under `app/` returned by the brand-audit command.

**Interfaces:**

- Consumes: Global identity and translations from Tasks 2-4.
- Produces: Bilingual secondary routes with no SIT branding or IT-specific defaults.

- [ ] **Step 1: Apply safe mechanical identity replacements**

Apply only these exact replacements to remaining text files:

```text
https://sit.ttu.edu.vn -> https://biotech.ttu.edu.vn
sit.ttu.edu.vn -> biotech.ttu.edu.vn
sit@ttu.edu.vn -> secretary.sbio@ttu.edu.vn
School of Information Technology -> School of Biotechnology
Khoa Công nghệ Thông tin -> Khoa Công nghệ Sinh học
```

Do not mechanically replace ordinary words that merely contain `sit`.

- [ ] **Step 2: Rewrite hardcoded IT descriptions**

For every remaining `SIT`, `CNTT`, AI, computer science, data science, Web3,
software, and cybersecurity match, replace the user-facing copy with the
appropriate Biotech message or remove the fallback entirely when it belongs to
a CMS collection.

Run:

```bash
rg -n -i '\bSIT\b|CNTT|công nghệ thông tin|information technology|computer science|data science|Web3|cybersecurity' \
  app --glob '!**/.next/**' --glob '!**/node_modules/**'
```

Expected: no user-facing matches remain.

- [ ] **Step 3: Replace remaining orange design literals**

Run:

```bash
rg -l -i '#BA4811|#ba4911|#b74717|#a84316|#96380d' app/src \
  | xargs perl -pi -e 's/#BA4811/#16856F/g; s/#ba4911/#16856F/g; s/#b74717/#16856F/g; s/#a84316/#0D5E50/g; s/#96380d/#0D5E50/g'
```

Review the diff to ensure contrast remains valid.

- [ ] **Step 4: Validate all public routes compile**

Run:

```bash
pnpm --filter frontend build
git diff --check
```

Expected: both commands exit zero.

- [ ] **Step 5: Commit secondary-route rebranding**

```bash
git add app
git commit -m "feat: complete public Biotech rebrand"
```

---

### Task 6: Rebrand the backend, dashboard, and repository configuration

**Files:**

- Modify: `backend/.env.example`
- Modify: `backend/README.md`
- Modify: `backend/src/app.controller.ts`
- Modify: `backend/src/app.dto.ts`
- Modify: `backend/src/main.ts`
- Modify: `backend/db/schema.ts`
- Modify: `dashboard/src/app/globals.css`
- Modify: `dashboard/src/app/layout.tsx`
- Modify: `dashboard/src/app/login/page.tsx`
- Modify: `dashboard/src/components/layout/Header.tsx`
- Modify: `dashboard/src/components/layout/Sidebar.tsx`
- Modify: all remaining dashboard/backend files reported by the brand audit.
- Modify: `README.md`
- Modify: `package.json`
- Modify: `.env.shared.example`
- Modify: `deploy.sh`
- Modify: `ecosystem.config.js`
- Modify: `.github/workflows/deploy.yml`
- Modify: `.github/ISSUE_TEMPLATE/bug_report.yml`
- Modify: `.github/ISSUE_TEMPLATE/config.yml`
- Modify: `SECURITY.md`

**Interfaces:**

- Consumes: Existing API routes, dashboard routes, and deployment behavior.
- Produces: The same operational interfaces with Biotech names and defaults.

- [ ] **Step 1: Update backend identity without changing API behavior**

Use:

```text
API title: Biotech TTU API
API description: School of Biotechnology content management API
Default database example: postgresql://postgres@localhost:2345/biotech_db
Default public app origin: https://biotech.ttu.edu.vn
```

Do not rename tables, endpoints, DTO fields, or migrations.

- [ ] **Step 2: Rebrand the dashboard shell**

Keep all dashboard routes and CRUD forms. Replace logo, title, subtitle, sidebar
brand, login copy, and orange theme values with the shared Biotech identity and
palette.

- [ ] **Step 3: Rebrand repository/deployment documentation**

Set package name to `school-of-biotechnology`, update repository descriptions,
badges, service names, hostnames, and support contacts. Preserve script behavior
and PM2 process structure.

- [ ] **Step 4: Audit non-public workspaces**

Run:

```bash
rg -n -i 'school of information technology|khoa công nghệ thông tin|\bSIT\b|sit\.ttu\.edu\.vn|sit@ttu\.edu\.vn|sit_db|#BA4811' \
  backend dashboard README.md package.json .env.shared.example deploy.sh ecosystem.config.js .github SECURITY.md \
  --glob '!backend/drizzle/**'
```

Expected: no matches.

- [ ] **Step 5: Build backend and dashboard**

Run:

```bash
pnpm --filter backend build
pnpm --filter dashboard build
```

Expected: both builds exit zero.

- [ ] **Step 6: Commit system identity changes**

```bash
git add backend dashboard README.md package.json .env.shared.example deploy.sh ecosystem.config.js .github SECURITY.md
git commit -m "feat: rebrand Biotech administration"
```

---

### Task 7: Initialize only `biotech_db` and create the first administrator

**Files:**

- Create locally but do not commit: `backend/.env`
- No tracked source changes expected.

**Interfaces:**

- Consumes: PostgreSQL container `postgres` on host port `2345`, database
  `biotech_db`, Drizzle migrations, and `users:create-admin`.
- Produces: Migrated empty CMS schema plus one active administrator and one
  `admin` role row.

- [ ] **Step 1: Verify the target database**

Run:

```bash
docker exec postgres psql -U postgres -d postgres -Atc \
  "select datname from pg_database where datname = 'biotech_db';"
```

Expected: exactly `biotech_db`.

- [ ] **Step 2: Configure the local backend**

Copy `backend/.env.example` to ignored `backend/.env`. Set:

```dotenv
DATABASE_URL=postgresql://postgres@127.0.0.1:2345/biotech_db
UPLOAD_PUBLIC_URL=http://localhost:8080
UPLOAD_TRUSTED_ORIGINS=http://localhost:8080
```

Generate missing API/JWT secrets with:

```bash
cd backend
pnpm run security:generate-secrets
```

Preserve the generated secrets only in ignored `backend/.env`.

- [ ] **Step 3: Apply migrations**

Run:

```bash
pnpm --filter backend db:migrate
```

Expected: migrations complete against `biotech_db` only.

- [ ] **Step 4: Verify CMS tables are empty**

Run:

```bash
docker exec postgres psql -U postgres -d biotech_db -Atc "
select table_name || '=' || row_count
from (
  select 'program' table_name, count(*) row_count from program
  union all select 'curriculum', count(*) from curriculum
  union all select 'news', count(*) from news
  union all select 'event', count(*) from event
  union all select 'research', count(*) from research
  union all select 'faculty', count(*) from faculty
  union all select 'achievement', count(*) from achievement
  union all select 'alumni', count(*) from alumni
  union all select 'handbook', count(*) from handbook
  union all select 'student_portfolio', count(*) from student_portfolio
) counts order by table_name;"
```

Expected: every listed count is `0`.

- [ ] **Step 5: Create the administrator without recording the password**

From an interactive shell:

```bash
cd backend
read -s "ADMIN_PASSWORD?Administrator password: "
printf '\n'
pnpm run users:create-admin -- \
  --email louisdevzz04@gmail.com \
  --password "$ADMIN_PASSWORD" \
  --name "Louis Devzz"
unset ADMIN_PASSWORD
```

Expected: script reports the administrator email and generated user ID without
printing the password.

- [ ] **Step 6: Verify only the administrator exists**

Run:

```bash
docker exec postgres psql -U postgres -d biotech_db -Atc "
select u.email || '|' || u.is_active || '|' || r.role
from \"user\" u
join user_role r on r.user_id = u.user_id
order by u.email;"
```

Expected:

```text
louisdevzz04@gmail.com|t|admin
```

---

### Task 8: Full-system verification and final audit

**Files:**

- Modify only files required to fix failures directly caused by Tasks 1-7.

**Interfaces:**

- Consumes: Completed rebrand, migrated local database, and initial admin.
- Produces: Reproducible evidence that the repository and local runtime meet the approved spec.

- [ ] **Step 1: Install dependencies and run all builds**

Run:

```bash
pnpm install --frozen-lockfile
pnpm build
```

Expected: frontend, backend, and dashboard builds exit zero.

- [ ] **Step 2: Run focused backend tests**

Run:

```bash
pnpm --filter backend test -- --runInBand
```

Expected: tests exit zero. Record pre-existing failures separately and fix only
failures caused by this rebrand.

- [ ] **Step 3: Run the final brand audit**

Run:

```bash
rg -n -i 'school of information technology|khoa công nghệ thông tin|\bSIT\b|sit\.ttu\.edu\.vn|sit@ttu\.edu\.vn|sit_db|#BA4811' \
  . --glob '!.git/**' --glob '!**/node_modules/**' --glob '!**/.next/**' \
  --glob '!**/dist/**' --glob '!backend/drizzle/**' \
  --glob '!docs/superpowers/specs/2026-07-25-biotech-rebrand-design.md' \
  --glob '!docs/superpowers/plans/2026-07-25-biotech-rebrand.md'
```

Expected: no matches.

- [ ] **Step 4: Run data-removal audit**

Run:

```bash
test "$(find backend/backups -type f ! -name .gitignore | wc -l | tr -d ' ')" = 0
test "$(find backend/uploads -type f ! -name .gitignore | wc -l | tr -d ' ')" = 0
test ! -e app/public/assets/logo-sit.png
test ! -e dashboard/public/assets/logo-sit.png
```

Expected: all commands exit zero.

- [ ] **Step 5: Start the full local stack**

Run:

```bash
pnpm dev
```

Verify:

```text
Public VI: http://localhost:3000/vi
Public EN: http://localhost:3000/en
Dashboard: http://localhost:4000/login
Backend docs: http://localhost:8080/api/docs
```

- [ ] **Step 6: Verify public and admin flows**

Use agent-browser to confirm:

1. `/vi` and `/en` show the Biotech logo, metadata, content, and green palette.
2. Header desktop/mobile navigation and locale switching work.
3. CMS sections have no SIT fallback cards.
4. Admin login succeeds with the requested credentials.
5. Dashboard shows empty content collections ready for entry.
6. No console errors, broken images, or failed same-origin API requests appear.

- [ ] **Step 7: Review the final diff**

Run:

```bash
git status --short
git diff --check
git log --oneline --decorate -8
```

Expected: only intentional rebrand changes are present, no secrets or generated
build output are tracked, and each task has a focused commit.
