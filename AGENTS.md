# AGENTS.md

## Project Context
- This project is a photography portfolio and brand site.
- It is not an e-commerce project.
- Do not add cart, checkout, payment, inventory, order management, or auth.
- Reservation must remain an external Naver Booking link.
- Stack: Next.js App Router, TypeScript, Tailwind CSS, Vercel.

## Source Of Truth
- Read and follow these documents before large implementation changes:
  - `requirements.md`
  - `design.md`
  - `system-overview.md`
  - `information-architecture.md`
  - `component-architecture.md`
  - `content-model.md`
  - `contact-and-reservation.md`
  - `ADR-001-rendering-strategy.md`
  - `ADR-002-content-management-strategy.md`
  - `ADR-003-reservation-integration.md`
  - `tasks.md`

## Product Direction
- MVP-first
- static-first
- mobile-first
- SEO-aware
- accessibility-aware
- content-driven

## Design / UX Rules
- Use `https://supernova001.cafe24.com/` as the visual reference.
- Match the reference site as closely as practical without copying any e-commerce behavior.
- Prefer image-first layouts.
- Keep text minimal.
- Use short headings.
- Avoid long descriptions unless explicitly requested.
- Let spacing, image scale, and composition carry most of the page.
- Keep visual hierarchy quiet and clean.

## Current Site Direction
- Home should feel closer to a lookbook than a marketing landing page.
- Mobile presentation is especially important and should be checked first.
- In mobile and narrow widths, avoid switching to desktop layout too early.
- Reduce unnecessary labels, utility bars, and duplicate navigation when they make the layout feel heavier than the reference.
- Keep images large and prominent, but avoid over-cropping when the user asks for a smaller visible image area.

## Header / Home Rules
- The home page may use a dedicated category strip between the header and the main hero image when requested.
- Avoid duplicate desktop navigation rows if the same information is already shown elsewhere on the page.
- Keep the main hero text minimal.
- If requested, prefer a single short title such as `Independent`.

## Content Rules
- Use local JSON content files.
- Keep Zod validation active.
- Fail clearly on invalid required content.
- Keep the content model compatible with future detail pages.

## Implementation Rules
- Prefer Server Components by default.
- Use Client Components only when interaction is required.
- Keep dependencies minimal.
- Use semantic HTML.
- Reuse existing components before creating new ones.
- Do not redesign working sections unnecessarily.
- Do not introduce future features unless explicitly requested.

## Do Not Add Unless Requested
- CMS
- database
- analytics
- auth
- custom booking flow
- contact backend
- filters, tabs, sorting UI
- FAQ/blog/journal systems

## Naming / Structure
- Use kebab-case for file names.
- Use PascalCase for React component names.
- Keep folder structure aligned with the design and architecture docs.

## Deployment Rules
- GitHub push to `main` triggers Vercel auto deployment.
- Prefer the current public URL as the working production URL:
  - `https://supernova-photo.vercel.app`
- If alias behavior and project-domain behavior differ, prefer project-domain style public access.

## Git Rules
- Write commit messages in Korean.

## Working Style For Future Sessions
- Make the change directly when the request is clear.
- Verify with:
  - `npm.cmd run typecheck`
  - `npm.cmd run build`
- Push only after local verification when deployment is intended.
- When the user asks for visual matching, optimize for exact visible differences first.
