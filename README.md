# Samuel Oguntona portfolio

A single-page Next.js portfolio with a fixed charcoal-and-paper section layout, projects, background, learning, a browser-only simulated terminal, a build log, and contact details.

## Development

Run `npm ci`, then `npm run dev`. Validate with `npx tsc --noEmit` and `npm run build`.

## Content

The Middleman is in development; its visual is a real public waitlist capture from October 2026. SkillPrint is a concept for adaptive assessment and learner profiles, presented as written project notes. S.A.M.U.E.L. and SYNAPSE are experiments. No screenshots, claims or milestones imply these concepts are finished products.

The existing real portrait uses normal blending in both themes. The portrait-led charcoal hero uses the user-supplied photograph at `public/images/samuel-oguntona.jpg`, unchanged. The hero displays the supplied photo at a larger scale and clips only its outer cream canvas to follow the reference composition. No face filtering, recolouring or dark blending is applied. Earlier processed portrait variants and decorative project mockups have been removed. The terminal is deliberately black and hacker green. There is no theme toggle, OS theme switch or saved colour preference. The résumé remains downloadable from the Story section. The learning timeline avoids unsupported completion dates and certificate buttons.

## Interaction

Click or keyboard-activate the moving project strip to pause or resume. Hover and focus keep it moving. Reduced motion stops decorative animations. The terminal heading briefly reverses and rearranges letters while visible, then returns to its original text. It has no flashing, sound or screen-reader announcements, pauses in background tabs and is static with reduced motion.

The terminal executes no system commands. The optional contact form appears only with `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`; email and profile links are always available.

`/about` redirects to `/#story`. Former Explorer and Playground URLs redirect to `/#learning`. Navigation uses anchors on the same page. Static-export previews include legacy redirect documents.

## Opening

The opening begins with a dark screen, types “Loading a very serious portfolio,” corrects it to “mostly serious,” and hints at the terminal, then reveals the hero and portrait. It plays once per browser session, includes a Skip introduction control, and skips for reduced motion, direct section links, scrolling, keyboard navigation, or a background tab. Without JavaScript, the overlay automatically disappears and the content remains readable.

Hero typography uses Manrope in sentence case. The supplied photo stays in a responsive grid column with a bounded height; it no longer extends beyond the desktop hero frame.
