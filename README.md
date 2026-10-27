# Everything 4D — Company Site

Static multi-page site. No build step, no dependencies, no backend.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, three service pillars, Why E4D, founder teaser, one testimonial, CTA |
| `services.html` | What we do — consulting/development, inheriting a 4D system, training, stewardship, engagement process |
| `about.html` | Who is E4D? — short answer, origin story, principles, timeline, full founder bios |
| `clients.html` | Industries, testimonials, anonymized case notes |
| `contact.html` | Contact form (Formspree), address, what to expect |

## Shared pieces

- `assets/site.css` — the one stylesheet for every page. Page-specific sections are grouped under commented headings.
- Header (nav + inline SVG logo) and footer are **duplicated in each HTML file**. When you change one, change all five. The nav marks the current page with `aria-current="page"`.
- Scroll-reveal and copyright-year JS is inlined at the bottom of each page; the Formspree handler is only on `contact.html`.

## Assets

- `assets/kirk.jpg`, `doug.jpg`, `angel.jpg` — founder headshots (square). Swap the file, no HTML edits.
- `assets/partner-badge.png` — 4D Silver Partner badge.
- Favicons: `e4d_icon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
- Original banners and icon retained for reference.

## Deploy — Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → this repo.
2. Build settings: framework **None**, build command **(empty)**, output directory **/**.
3. Custom domain: Pages project → Custom domains → add `everything4d.com` and `www.everything4d.com`.

Commit + push to `main` redeploys automatically. Pull requests get a preview URL.

## Contact form

Posts to Formspree form `mzdqargo` (configured in `contact.html`). The delivery address is set in the Formspree dashboard, not in the HTML. Fields: name, email, company (optional), message.

## Editorial notes

- 4D Happy Hour ended in October 2026. It is referenced only in the past tense, on the About page.
- Client names on the site are limited to the two published testimonials (Waltons Direct, i.LEVEL). Case notes are anonymized; the large 4D installation is deliberately unnamed.
