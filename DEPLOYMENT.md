# Portfolio deployment

Production: https://bukssamuel.dev

Cloudflare Worker: `buks-portfolio`. Both the root domain and `www` are attached
as Worker Custom Domains. `worker.js` redirects `www` to the root domain,
preserving the path and query; other requests delegate to the ASSETS binding.
Do not replace the Cloudflare-managed DNS records with an A record pointing
at a registrar parking server. Unused subdomains intentionally have no wildcard.

## Updates

Push reviewed changes to `main`. Cloudflare builds and deploys that branch.
The last successful deployment remains live if a build fails.

Build command: `npm run build`

Deploy command: `npx wrangler@4.150.0 deploy --config wrangler.static.json`

This is a Next.js static export. Upload `out`, not `.next`, and do not run an
OpenNext migration. The deployment configuration is checked into this repository.
Keep the two Custom Domains attached when editing Worker settings.

## Checks before publishing

Run `npm ci`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
Verify the export includes `index.html`, `404.html`, `robots.txt`, `sitemap.xml`,
the portrait, and the résumé. Check mobile navigation and motion in a browser.

After deployment, verify the homepage returns 200; www returns a redirect to
the root; old /about and /explorer links redirect to the correct sections;
and an unknown path returns 404. Test the résumé download and project links.

## Troubleshooting and recovery

- Build failed: inspect Workers & Pages → buks-portfolio → Builds, then open logs.
- Error 525: check which hostname failed and whether it is a Worker Custom Domain.
  Remove obsolete parking records only after confirming their purpose. Changing
  SSL mode to Flexible is not a fix for a wrong DNS destination.
- Old content: check the deployed commit and use a hard refresh. HTML is
  revalidated; only fingerprinted Next.js files are cached for a year.
- Broken release: use Worker deployment history to roll back to a known-good
  version, then fix the code and publish a new commit.
- Domain unavailable: the workers.dev address is a fallback. Domain registration
  and renewal are managed at Name.com; keep renewal and contact details current.

No paid monitoring or recurring subscription is configured by this setup.
