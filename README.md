# Everything 4D — Identity Site

Single-page static site. No build step, no dependencies, no backend.

## Files

- `index.html` — the entire site (HTML + CSS + JS, logo inlined)
- `assets/` — favicons and brand images
  - `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` (transparent E4D icon at standard sizes)
  - `e4d_icon.png` — full-res transparent icon
  - original banners and icon retained for reference

## Deploy to Cloudflare Pages (recommended)

1. Push this folder to a GitHub repo (e.g. `e4d-site`).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Select the repo. Build settings: framework **None**, build command **(empty)**, output directory **/**.
4. Deploy. You get `e4d-site.pages.dev` immediately.
5. Custom domain: Pages project → Custom domains → add `everything4d.com` and `www.everything4d.com`. If the domain's DNS is on Cloudflare this is one click; otherwise add the CNAME records it shows you.

Updates: commit + push to the repo and Pages redeploys automatically.
Any of the three members can edit.

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
- [ ] Confirm the YouTube channel URL (`https://www.youtube.com/@everything4d` is assumed — verify the handle).
- [x] Confirm `admin@everything4d.com` is live.
- [ ] Review founder bios — drafted from the Clay email; edit freely.
