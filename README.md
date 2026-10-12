# Samuel Oguntona portfolio

A single-page Next.js portfolio with light and dark themes, projects, background, learning, a browser-only simulated terminal, a build log, and contact details.

## Development

Run `npm ci`, then `npm run dev`. Validate with `npx tsc --noEmit` and `npm run build`.

## Content

The Middleman is in development; its visual is a real public waitlist capture from October 2026. SkillPrint is a concept for adaptive assessment and learner profiles, with a clearly labelled illustrative interface. S.A.M.U.E.L. and SYNAPSE are experiments. No screenshots, claims or milestones imply these concepts are finished products.

The existing real portrait uses normal blending in both themes. The paper textures and geometric hero illustration are local SVG assets. The original portrait remains oval and uses no filter or dark blending. The terminal is deliberately black and hacker green in both themes. The résumé remains downloadable from the Story section. The learning timeline avoids unsupported completion dates and certificate buttons.

## Interaction

Click or keyboard-activate the moving project strip to pause or resume. Hover and focus keep it moving. Reduced motion stops decorative animations. The terminal heading briefly reverses and rearranges letters while visible, then returns to its original text. It has no flashing, sound or screen-reader announcements, pauses in background tabs and is static with reduced motion.

The terminal executes no system commands. The optional contact form appears only with `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`; email and profile links are always available.

`/about` redirects to `/#story`. Former Explorer and Playground URLs redirect to `/#learning`. Navigation uses anchors on the same page. Static-export previews include legacy redirect documents.
