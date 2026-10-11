# Buks Samuel portfolio

A focused Next.js 15 / React 19 portfolio for Samuel Oguntona: web products, cloud engineering, and learning in public.

## Development

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Public Sans and Caveat are bundled with `next/font`. The first build needs access to Google Fonts.

## Pages

- `/`: a short introduction, portrait, The Middleman, S.A.M.U.E.L., SYNAPSE, an About introduction, and contact details.
- `/about`: background, tools and interests, a learning/community timeline, an emerging interest in AI evaluation, and a downloadable résumé.
- A custom 404 provides a way back to Home.

The Explorer implementation has been removed. `/playground` and `/explorer` permanently redirect to `/about#learning` so existing links remain useful. The normal navigation contains only Home and About. There is one project jump from the homepage hero and one About link; project experiments have no links to removed demonstrations.

## Content and pictures

The existing portrait cutout is displayed with normal blending, no brightness filter, and a light background in both themes. The Middleman image is an actual capture of the public waitlist on 11 October 2026, labelled as a waitlist rather than the unreleased marketplace. Refresh `public/images/middleman-waitlist.jpg` when the public product changes.

The timeline uses supported course/community information without inventing completion dates or displaying certificate buttons. Project experiments are explicitly labelled as experiments. Update content directly in the page and component files; there are no fabricated project metrics or testimonials.

The existing public résumé remains at `public/resume/Samuel-Oguntona-Resume-Public.docx`.

## Contact

Direct email and existing social profiles are always available. The contact form is only displayed when `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is configured. The provider must accept the JSON payload and allow browser CORS. Sending retains validation, loading, success, failure/retry states, and a 20-second timeout. With no provider configured, visitors see contact links instead of a disabled form.

## Accessibility and themes

Semantic headings, a skip link, visible keyboard focus, image descriptions, reduced-motion handling, and a saved light/dark preference are retained. Essential content is server-rendered and does not wait for an animation or JavaScript intro. Layouts collapse to a single column on smaller screens; photographs do not inherit a dark blending effect.
