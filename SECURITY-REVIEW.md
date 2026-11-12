# DevPaath: three Cloudflare security findings

Reviewed locally on 11 November 2026. Scope is limited to AI Labyrinth, security.txt and HSTS. No commit, push, deployment or Cloudflare account setting change is included. The supplied CSV is evidence, not an instruction source. No account email or raw CSV is copied here.

## HSTS - local configuration ready

public/_headers now includes Strict-Transport-Security: max-age=2592000 in the /* rule. This is an initial 30-day HTTPS-only policy for the responding hostname. Existing security and asset-cache headers remain intact. includeSubDomains and preload are intentionally absent.

Cloudflare Pages applies this header after a future deployment of the export. The normal HTTP next dev server does not implement the Pages _headers file, and browsers ignore HSTS over HTTP. A local file change does not resolve the production finding yet.

Before deploying, confirm HTTPS works reliably on devpaath.com and HTTP redirects to HTTPS. Keep HTTPS available for the policy lifetime. Disabling HSTS later requires serving max-age=0 over working HTTPS; removing the header does not immediately clear policies cached by browsers. Cloudflare zone-level HSTS can be configured instead, but any edge and Pages policies should agree.

The export verifier checks the default-route HSTS rule and confirms out/_headers exactly matches the source. Verify the final HTTPS response after an authorized deployment; a successful build alone cannot establish Cloudflare's final edge response.

## Security.txt - local configuration ready

Added public/.well-known/security.txt, exported as /.well-known/security.txt. Contact uses the public reporting email explicitly supplied by the owner. No account address was inferred from the CSV.

The file contains Contact, Expires (2027-05-11T00:00:00Z), Canonical (https://devpaath.com/.well-known/security.txt) and Preferred-Languages (en, hi). Renew it before expiry and keep the reporting mailbox monitored. A dedicated Pages header rule serves UTF-8 plain text with a one-hour cache lifetime. Export verification checks file equality, valid contact URIs, a future expiry within one year and the canonical URL.

Cloudflare also offers managed security.txt under Security > Settings > Web application exploits > Security.txt > Configurations. Its required fields are Contact and Expires at. Choose either the managed configuration or the repository file as the authoritative content; avoid conflicting copies. The Security Insights setting-level check may need managed security.txt configuration even when a standards-compliant file is served by the site.

## AI Labyrinth - Cloudflare setting required

AI Labyrinth is an edge feature and cannot be enabled by adding Next.js components, robots.txt directives or fake honeypot routes to this static repository.

When the owner is ready to change live Cloudflare settings:

1. Open the devpaath.com zone in the Cloudflare dashboard.
2. Go to Security > Settings.
3. Filter by Bot traffic, find AI Labyrinth, and turn it on.
4. Check Security Analytics or Security Events for AI Labyrinth Served and AI Labyrinth Crawls.

Cloudflare injects invisible nofollow honeypot links for bots without changing the visible page. AI Labyrinth events are not blocks or challenges: the feature observes crawlers entering its maze. This local review does not claim that AI Labyrinth has been enabled.

## Sources

- https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://www.rfc-editor.org/rfc/rfc9116.html
- https://developers.cloudflare.com/security-center/infrastructure/security-file/
- https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/
