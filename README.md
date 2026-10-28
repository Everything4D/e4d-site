# Everything 4D — Identity Site

Static site. No dependencies, no backend. One optional build step (the downloads list, below).

## Files

- `index.html` — the home page (HTML + CSS + JS, logo inlined)
- `privacy.html`, `terms.html` — Privacy Statement and Terms of Service. Linked from the
  common footer on every page. Required by Microsoft (Entra app registration for the
  mail-sending integration) and Intuit; their consent screens link to these URLs.
- `oAuthConfirmation.html` — landing page shown after an OAuth consent flow completes.
  Keep the filename exactly as registered with the provider (URLs are case-sensitive).
- `downloads/` — unlisted file-distribution page (see below)
- `assets/page.css` — shared stylesheet for every page except `index.html`
- `_headers` — Cloudflare Pages headers (`noindex` on downloads and the OAuth page)
- `scripts/build-downloads.mjs`, `.githooks/pre-commit` — downloads list generator
- `assets/` — favicons and brand images
  - `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` (transparent E4D icon at standard sizes)
  - `e4d_icon.png` — full-res transparent icon
  - original banners and icon retained for reference

## Deploy to Cloudflare Pages (recommended)

1. Push this folder to a GitHub repo (e.g. `e4d-site`).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Select the repo. Build settings: framework **None**, build command
   `node scripts/build-downloads.mjs`, output directory **/**.
4. Deploy. You get `e4d-site.pages.dev` immediately.
5. Custom domain: Pages project → Custom domains → add `everything4d.com` and `www.everything4d.com`. If the domain's DNS is on Cloudflare this is one click; otherwise add the CNAME records it shows you.

Updates: commit + push to the repo and Pages redeploys automatically.
Any of the three members can edit.

## Downloads page

`https://everything4d.com/downloads/` lists every file in the `downloads/` folder with a
download link. It is not linked from anywhere on the site and is marked `noindex`; give the
URL to people when they need it.

To publish a file: drop it in `downloads/`, commit, push. Nothing else to edit. The list
comes from `downloads/files.json`, which `scripts/build-downloads.mjs` regenerates from the
folder contents (name, size, modified date; `index.html`, `files.json` and dotfiles are
skipped). It runs automatically:

- on every Cloudflare Pages deploy, as the build command (above), and
- on every commit, via the pre-commit hook — enable it once per clone with
  `git config core.hooksPath .githooks` (needs Node ≥ 18).

Either one is enough; both together mean the committed `files.json` is never stale.
You can also run it by hand: `node scripts/build-downloads.mjs`.

## Contact form — one required step

The form posts to Formspree. Before launch:

1. Create a free account at formspree.io (free tier: 50 submissions/month).
2. Create a form pointed at the address you want submissions delivered to (e.g. admin@everything4d.com).
3. Copy the form ID and replace `YOUR_FORM_ID` in `index.html`:
   `action="https://formspree.io/f/YOUR_FORM_ID"`

Alternative with zero third parties: replace the form with a `mailto:` link, or use a small Cloudflare Worker + MailChannels (more setup, also free).

## To-do before/after launch

- [x] Formspree form ID (above)
- [x] Founder headshots — placeholder images are at `assets/kirk.jpg`,
      `assets/doug.jpg`, `assets/angel.jpg`. The real photos already exist in
      the current site's WordPress media library:
      - kirk: /wp-content/uploads/2025/06/kirk-brooks.jpeg
      - angel: /wp-content/uploads/2025/06/angel.jpeg
      - doug: /wp-content/uploads/2025/06/IMG_3343-square.jpg
      Download each, rename to kirk.jpg / angel.jpg / doug.jpg, overwrite the
      placeholders, commit, push. No HTML edits. Ideal: square, 800×800,
      under ~150 KB (the 300px WordPress thumbnails are too small — get the
      originals from the media library).
- [x] Confirm the YouTube channel URL (`https://www.youtube.com/@everything4d` is assumed — verify the handle). ✅ 2026-08-07
- [x] Confirm `admin@everything4d.com` is live.
- [x] Review founder bios — drafted from the Clay email; edit freely. ✅ 2026-08-07
