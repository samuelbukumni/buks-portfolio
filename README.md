# Samuel Oguntona portfolio

A single-page Next.js portfolio with a fixed charcoal-and-paper section layout, projects, background, learning, a browser-only simulated terminal, a build log, and contact details.

## Development

Run `npm ci`, then `npm run dev`. Validate with `npx tsc --noEmit` and `npm run build`.

## Content

The Middleman is in development; its visual is a real public waitlist capture from October 2026. SkillPrint is a concept for adaptive assessment and learner profiles, presented as written project notes. S.A.M.U.E.L. and SYNAPSE are experiments. No screenshots, claims or milestones imply these concepts are finished products.

The portrait-led charcoal hero uses the user-supplied photograph at `public/images/samuel-oguntona.jpg`, unchanged. The hero uses a proportionate, bounded oval frame with a CSS presentation crop that removes the photograph’s outer cream canvas. No face filtering, recolouring or dark blending is applied. Earlier processed portrait variants and decorative project mockups have been removed. The terminal is deliberately black and hacker green. There is no theme toggle, OS theme switch or saved colour preference. The résumé remains downloadable from the Story section. The learning timeline avoids unsupported completion dates and certificate buttons.

## Interaction

Click or keyboard-activate the moving project strip to pause or resume. Hover and focus keep it moving. Reduced motion stops decorative animations. The terminal heading briefly reverses and rearranges letters while visible, then returns to its original text. It has no flashing, sound or screen-reader announcements, pauses in background tabs and is static with reduced motion.

The terminal executes no system commands. The optional contact form appears only with `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`; email and profile links are always available.

`/about` redirects to `/#story`. Former Explorer and Playground URLs redirect to `/#learning`. Navigation uses anchors on the same page. Static-export previews include legacy redirect documents.

## Opening and effects

On pitch black, “This is where the trail leads.” types in, followed by exactly three extra caret blinks, one 260 ms text glitch and the hero reveal. The opening plays once per session, stays skippable, and is bypassed for reduced motion, keyboard navigation and direct section links.

Mouse visitors get an 18 px Libra-inspired line cursor, with a small hover and press response. Touch devices and editable fields keep native interaction. The native cursor is retained until the custom cursor is ready.

The three concept/experiment project faces sit at small, alternating angles and straighten on hover. Touch devices and reduced motion show upright cards. The original learning heading and timeline are restored; a slow colour sweep remains on the heading and build log. Terminal dots use red, amber and green with different pulse durations and offsets. Reduced motion stops all decorative effects.

Technology and AI-tool icons are downloaded, unchanged, from the vendors’ official sites. Source URLs are recorded in `public/icons/sources.json`. Icons are hosted locally, have visible text labels and are decorative to screen readers. AI tools are explicitly listed as tools used, not as professional qualifications or endorsements.

## Search visibility

`https://bukssamuel.dev/` is the canonical homepage and the only URL in the XML sitemap. Legacy section paths redirect to homepage anchors. The canonical hostname has no `noindex` header; the `workers.dev` copies have `X-Robots-Tag: noindex`. Keep public names and profile URLs in `app/seo.ts` consistent with the contact links. Do not add redirected URLs to the sitemap.

Google Search Console: create or select the `bukssamuel.dev` domain property and complete its ownership verification. A URL-prefix property can use an HTML meta token by setting `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in the Cloudflare production build environment, then rebuilding. Do not commit the token. Submit `https://bukssamuel.dev/sitemap.xml`, inspect `https://bukssamuel.dev/`, and request indexing if eligible. Monitor the Page indexing and Search results reports afterward. A sitemap and request do not guarantee indexing or ranking.
