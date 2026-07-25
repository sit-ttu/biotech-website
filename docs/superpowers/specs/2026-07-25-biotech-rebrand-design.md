# Biotech TTU Rebrand Design

## Objective

Transform the existing School of Information Technology website into the
official School of Biotechnology website for Tan Tao University while retaining
the working Next.js, NestJS, PostgreSQL, and admin-dashboard architecture.

The result must contain no SIT content, uploads, database backups, branding, or
sample CMS records. It must use official Biotech information as static/default
content and leave CMS-managed collections empty for future entry.

## Approved Scope

- Keep the public app, backend API, dashboard, CMS schema, authentication, and
  bilingual routing.
- Keep the current SIT header structure and interaction patterns so the new site
  remains consistent with the TTU website family.
- Replace SIT branding, wording, domains, contact information, metadata, assets,
  colors, and page content with Biotech equivalents.
- Remove committed database backups and all existing uploaded files.
- Remove sample or fallback SIT records and content from source files.
- Point the local backend at the existing PostgreSQL database named
  `biotech_db`, apply the existing schema migrations, and create the requested
  initial administrator.
- Do not delete or reset any database other than `biotech_db`.
- Do not import old news, faculty, publications, student activities, alumni, or
  other CMS-managed collections.

## Official Information Sources

Use the currently served Biotech TTU website as the source of truth for:

- School name and introduction.
- Biotechnology and High-Tech Agriculture programs.
- Navigation structure.
- Contact details.
- Official Biotech logo assets.
- Research and laboratory positioning.

When the live navigation conflicts with stale pages, prefer the live navigation.
Therefore the second displayed program is High-Tech Agriculture rather than the
older Applied Biology label.

## Information Architecture

The main navigation keeps the existing responsive SIT header behavior and uses:

1. Introduction
2. Academic Programs
   - Biotechnology
   - High-Tech Agriculture
3. Faculty
4. Research
   - Scientific Publications
   - Laboratories
5. Students
   - Admissions
   - Student Handbook
   - Student Activities
   - Careers
   - Alumni
6. News
7. Contact

Vietnamese and English routes remain available under `/vi` and `/en`.

## Visual Direction

The design is an evolutionary rebrand rather than an unrelated replacement.

- Preserve the header hierarchy, responsive menu behavior, search, language
  switcher, and overall navigation familiarity from SIT.
- Use a restrained modular hero inspired by the supplied biotech reference:
  one primary laboratory image, a small number of supporting information
  panels, and rounded containers rather than a highly fragmented image grid.
- Use rounded corners in the 20-28px range for major cards, with smaller radii
  for buttons and utility elements.
- Replace the SIT orange with a biological palette: deep forest/teal, fresh
  green, pale mint, warm off-white, and restrained yellow-green accents.
- Use real official Biotech/laboratory imagery where available. Do not retain
  computing, AI, data science, or other SIT-specific imagery.
- Keep typography editorial and academic, with strong Vietnamese readability.
- Maintain accessible contrast, keyboard navigation, visible focus states,
  reduced-motion behavior, and responsive layouts.

## Homepage Layout

1. Existing-style TTU/Biotech header.
2. Modular laboratory hero with school positioning and admissions CTA.
3. Concise official introduction.
4. Program cards for Biotechnology and High-Tech Agriculture.
5. Research and laboratory feature section.
6. Faculty section populated only when CMS records exist.
7. News/events section populated only when CMS records exist.
8. Admissions/contact CTA.
9. Biotech footer with official contact information.

Empty CMS sections must show an intentional empty state or remain hidden. They
must not fall back to SIT sample content.

## Data and Asset Cleanup

- Delete `backend/backups/` contents while retaining an ignore placeholder if
  required by the backup workflow.
- Delete all existing `backend/uploads/` contents while retaining the managed
  upload directory structure only if required at runtime.
- Delete unused SIT logos and SIT-specific public images.
- Remove SIT text from translations, SEO helpers, manifests, JSON-LD,
  documentation, deployment configuration, dashboard labels, backend
  descriptions, and seed/sample data.
- Preserve Drizzle migration history because it defines the CMS schema.

## Database and Administrator

- Verify the running Docker PostgreSQL instance and that `biotech_db` exists
  before changing anything.
- Update only local environment configuration that currently targets the old
  database.
- Apply the existing Drizzle migrations to `biotech_db`.
- Confirm CMS-managed content tables are empty.
- Create the initial administrator for `louisdevzz04@gmail.com` using the
  existing admin-creation path.
- Never commit the supplied password or print it in logs. Only its password hash
  may be stored in PostgreSQL.

## Verification

- `rg` finds no user-facing SIT branding, old SIT domain, email, or program
  content outside immutable migration/history contexts where removal is unsafe.
- Old backup files and uploaded media are absent from Git and disk.
- `biotech_db` contains the expected migrated schema and no old CMS content.
- The initial administrator can sign in to the dashboard.
- Public app, backend, and dashboard builds pass.
- `/vi` and `/en` render with Biotech metadata, navigation, logo, and content.
- Desktop and mobile header behavior matches the existing SIT interaction model.
- Homepage and key routes are visually checked at desktop and mobile widths.

## Non-Goals

- Importing WordPress posts or other historical CMS records.
- Rewriting the backend or replacing the dashboard.
- Changing the database schema solely for the rebrand.
- Deploying to production or modifying DNS.
