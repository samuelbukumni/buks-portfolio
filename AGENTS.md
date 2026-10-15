# Buks Samuel Portfolio

- This is Buks Samuel's professional portfolio. His primary identity is Tech Explorer and his secondary context is Information Systems student based in Nigeria.
- Preserve the indigo and off-white visual system: `#F4F1EA` background, `#151515` text, `#2B3A67` indigo accent, `#6C6B68` muted text, and `#D5D2CA` borders.
- Keep the visual language premium, editorial, technical, restrained, and intentional. Avoid generic AI-generated aesthetics, SaaS landing-page patterns, cyberpunk styling, neon dashboards, and glassmorphism-heavy UI.
- Explorer, Cloud/Linux, and Security are separate future experiences. Do not build those experiences into the professional portfolio unless explicitly requested.
- Never invent personal information, experience, awards, companies, statistics, testimonials, or accomplishments.
- Preserve semantic HTML, visible keyboard focus states, adequate contrast, responsive layouts, and `prefers-reduced-motion` support.

## Cursor Cloud specific instructions

- This multi-repo environment already starts the local apps. If a port answers, do not start a second server.
- Portfolio (this repo): http://127.0.0.1:3000. Setup is `npm ci`. Checks are `npm run lint`, `npx tsc --noEmit`, `npm test`, and `npm run build`.
- The Middleman is http://127.0.0.1:3001 (`pnpm install --frozen-lockfile`, pnpm 10.15.1, Node 22). Public pages render without Supabase. Marketplace data, accounts, orders, and payments need the variables in that repo's `.env.example`.
- Proposal Architect (Streamlit) is http://127.0.0.1:8501. Refyne's static site is http://127.0.0.1:4173.
- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is optional. Without it, contact stays email and profile links.