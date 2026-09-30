# Buks Samuel portfolio

A Next.js 15 / React 19 portfolio built around software, systems, infrastructure and an emerging AI evaluation research direction.

## Run locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run build
npx tsc --noEmit
```

The production build needs access to Google Fonts on its first run. Source Serif 4, Public Sans and IBM Plex Mono are bundled through `next/font`.

## Routes and content

- `/`: portrait, current focus, Middleman transaction/architecture inspector, agent experiments, lab index, build log, research, infrastructure map and contact.
- `/about`: first-person background, Information Systems framing, engineering and research directions.
- `/playground`: Explorer. Existing hash destinations remain supported, including `#terminal`, `#systems`, `#samuel` and `#synapse`.

Update the dated log in `data/build-log.ts`. Every entry includes an internal evidence field; add only dated, supported milestones. Current entries are grounded in repository commits `da7fe48`, `962bb78` and `1a4d9b4`.

The current focus is explicitly dated September 2026, not generated from the visitor's clock. Update the homepage Now strip and terminal `now.txt` together when priorities change. Terminal content lives in `app/playground-experience.tsx`.

### Content boundaries

Project descriptions and the Middleman stack come from existing repository content. This repository does not contain Middleman's implementation, so its diagram is a conceptual map of confirmed responsibilities, not a verified sequence of production requests. No Paystack-specific, idempotency or deployment-metric claims have been added.

AI evaluation and safety are presented as a new direction provided in the redesign brief, with open questions rather than completed research claims. CHALK, SkillPrint and Trove are omitted because the repository supplies no verified descriptions, technologies or destinations; the lab index instead links to real portfolio demonstrations.

## Styling

- `app/globals.css`: palette, shared tokens, reset, global primitives, focus and reduced-motion support.
- CSS Modules: header, homepage, projects, About and contact.
- `app/explorer.css`: styles for the existing Explorer implementation, loaded by that experience.

Critical content renders visibly without reveal scripts. Diagrams use HTML/CSS and small React interactions; there is no animation library or visualization dependency.

## Navigation and scroll memory

The root layout owns persistent navigation. Mobile uses a disclosure menu with Escape handling and visible focus states.

`app/route-memory.tsx` remembers positions for explicit same-tab switches between Home, About and Explorer during the current SPA session. It restores only after fonts are ready, the page is tall enough, and Explorer has resolved its hash view. User scrolling or keyboard input cancels a pending restoration. Explicit anchor navigation and native back/forward are left to Next.js and the browser. Memory intentionally does not persist across reloads.

## Contact form

Set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` to the chosen provider's browser-accessible JSON endpoint. The form sends `name`, `email`, `message` and the `_gotcha` honeypot. The provider must support CORS and accept or safely ignore that field.

Without the endpoint, submission is disabled and direct email remains available. Submission preserves validation, loading, success, error and retry states, with a 20-second timeout. Configure the public endpoint before building a deployment.

## Explorer

The terminal is a simulation: no shell execution, filesystem access, cloud operation or live model call occurs. Discoverable commands include `help`, `whoami`, `ls projects/`, `cat projects/middleman.md`, `cat research/ai-safety.md`, `cat now.txt`, `systemctl status samuel` and `clear`.

Governor decisions and the SYNAPSE stepper are deterministic architecture demonstrations.

## Redesign verification

- Passed production build, ESLint, TypeScript and whitespace checks.
- Checked homepage overflow at 320, 375, 390, 430, 768, 1024, 1280 and 1440px; checked About and the main Explorer interactions at 320px.
- Inspected desktop and mobile screenshots; exercised the architecture inspector, Governor deny path, SYNAPSE stepper, request flow and terminal project/research commands.
- Confirmed repeated Home/About scroll restoration, native back/forward, Explorer hash-view restoration and explicit Work anchor positioning in the production build.
- Confirmed reduced-motion rendering leaves all headings visible, and mobile-menu Escape closes the menu and returns focus.
- Automated accessibility scans reported no violations on Home, About, the terminal, Explorer map and Security. Diagram pseudo-elements needed manual contrast review; clay/peach is 5.03:1, paper/clay 6.23:1, and indigo/paper 9.78:1.
- Tested contact loading, payload, success, failure and retry with browser-local mock responses. Live provider delivery remains dependent on configuring the endpoint.
