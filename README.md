# Everything 4D — Company Site

Static multi-page site. No dependencies, no backend. One optional build step (the downloads list, below).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, three service pillars, Why E4D, founder teaser, one testimonial, CTA |
| `services.html` | What we do — consulting/development, inheriting a 4D system, training, stewardship, engagement process |
| `about.html` | Who is E4D? — short answer, origin story, principles, timeline, full founder bios |
| `clients.html` | Industries, testimonials, anonymized case notes |
| `contact.html` | Contact form (Formspree), address, what to expect |
| `privacy.html`, `terms.html` | Privacy Statement and Terms of Service. Linked from the common footer on every page. Required by Microsoft (Entra app registration for the mail-sending integration) and Intuit; their consent screens link to these URLs. |
| `oAuthConfirmation.html` | Landing page shown after an OAuth consent flow completes. Keep the filename exactly as registered with the provider (URLs are case-sensitive). Unlisted, `noindex`. |
| `downloads/` | Unlisted file-distribution page (see below) |

## Shared pieces

- `assets/site.css` — stylesheet for the main pages (home, services, about, clients, contact). Page-specific sections are grouped under commented headings.
- `assets/page.css` — stylesheet for the secondary pages (privacy, terms, OAuth confirmation, downloads).
- Header (nav + inline SVG logo) and footer are **duplicated in each HTML file**. When you change one, change all of them. The nav marks the current page with `aria-current="page"`.
- Scroll-reveal and copyright-year JS is inlined at the bottom of each main page; the Formspree handler is only on `contact.html`.
- `_headers` — Cloudflare Pages headers (`noindex` on downloads and the OAuth page).
- `scripts/build-downloads.mjs`, `.githooks/pre-commit` — downloads list generator.

## Assets

- `assets/kirk.jpg`, `doug.jpg`, `angel.jpg` — founder headshots (square). Swap the file, no HTML edits.
- `assets/partner-badge.png` — 4D Silver Partner badge.
- Favicons: `e4d_icon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
- Original banners and icon retained for reference.

## Deploy — Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → this repo.
2. Build settings: framework **None**, build command `node scripts/build-downloads.mjs`, output directory **/**.
3. Custom domain: Pages project → Custom domains → add `everything4d.com` and `www.everything4d.com`.

Commit + push to `main` redeploys automatically. Pull requests get a preview URL.

## Downloads page

`https://everything4d.com/downloads/` lists every file in the `downloads/` folder with a
download link. It is not linked from anywhere on the site and is marked `noindex`; give the
URL to people when they need it.

To publish a file: upload it to `downloads/` (FTP is fine). To retire it: delete it. The
page is `downloads/index.php`; it scans the folder on every request, so there is nothing
to rebuild and nothing else to edit. Dotfiles, subfolders, `index.php` and `.htaccess` are
skipped. `downloads/.htaccess` forces `index.php` as the index, disables raw directory
listings, and adds the `noindex` header. Requires PHP on the host.

## Contact form

Posts to Formspree form `mzdqargo` (configured in `contact.html`). The delivery address is set in the Formspree dashboard, not in the HTML. Fields: name, email, company (optional), message.

## Editorial notes

- 4D Happy Hour ended in October 2026. It is referenced only in the past tense, on the About page.
- Client names on the site are limited to the two published testimonials (Waltons Direct, i.LEVEL). Case notes are anonymized; the large 4D installation is deliberately unnamed.
