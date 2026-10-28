# Everything 4D — Company Site

Static multi-page site. No dependencies, no build step. The only server-side code is
`public_html/downloads/index.php`.

## Layout

```
e4d-site/
  README.md, .gitignore, deploy.sh   ← repo-only, never served
  public_html/                       ← everything the web server serves
    *.html, assets/, downloads/
```

Everything the web server serves lives in `public_html/`. Paths below are relative to it.

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

## Assets

- `assets/kirk.jpg`, `doug.jpg`, `angel.jpg` — founder headshots (square). Swap the file, no HTML edits.
- `assets/partner-badge.png` — 4D Silver Partner badge.
- Favicons: `e4d_icon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
- Original banners and icon retained for reference.

## Hosting and deployment — 20i

The site is hosted on 20i (My20i → Manage Hosting → everything4d.com), on a package under
Doug's Telekinetix reseller account. The package is a *Managed WordPress* type with no
WordPress installed; that matters only because the document root is locked to
`public_html` and cannot be repointed.

### How it is meant to work

```
GitHub main ──(My20i Git Version Control: Deploy)──▶ ~/e4d-site/   (a git checkout)
                                                          │
                                        deploy.sh copies public_html/ ──▶ ~/public_html/   (live)
                                                                       ──▶ ~/staging_html/ (staging)
```

1. **GitHub is the source of truth.** All edits are committed to `main` and pushed.
2. **My20i → Git Version Control** holds a clone of this repo at
   `/home/sites/35a/2/2585cdde4e/e4d-site`, connected to GitHub via the "Sign In" OAuth
   link, deployment branch `main`. Clicking **Deploy** on the Deployment tab runs
   `git pull` there. (We have not yet found a push-triggered auto-deploy; Deploy is manual.)
3. **`deploy.sh`** copies `e4d-site/public_html/` into the real web root. It never deletes
   anything already in the target, so files uploaded by FTP into `downloads/` survive.
   It appends a line to `~/deploy.log`.
   - `sh deploy.sh` → `~/public_html` (live)
   - `sh deploy.sh staging_html` → `~/staging_html` (staging URL, for testing first)

### Current status (Oct 2026)

- The clone and manual **Deploy** work.
- The **Deployment Script** field on the Basic Information tab did *not* run a plain shell
  command in testing (an `echo > file` test produced nothing). It may expect a script path
  such as `deploy.sh` / `sh deploy.sh staging_html`; not yet confirmed.
- **SSH** (Security → SSH Access, `everything4d.com@ssh.us.stackcp.com`) refused a
  registered ed25519 key; open question for 20i support. Once SSH works,
  `sh e4d-site/deploy.sh` is the one-line publish.
- **Until one of those is resolved, publishing is manual:** push → Deploy in My20i →
  File Manager: copy the *contents* of `e4d-site/public_html` over `public_html`.

### Publishing a site change

1. Edit, commit, push to `main`.
2. My20i → Git Version Control → e4d-site → Deployment → **Deploy**.
3. Publish `e4d-site/public_html` → `public_html` (deploy script, SSH `sh e4d-site/deploy.sh`,
   or File Manager copy — see status above).
4. Hard-reload the page in a browser. If it still looks stale, My20i → CDN → clear cache.

## Downloads page

`https://everything4d.com/downloads/` lists every file in the `public_html/downloads/`
folder with a download link. It is not linked from anywhere on the site and is marked
`noindex` (meta tag plus `X-Robots-Tag` from `.htaccess`); give the URL to people when they
need it.

The page is `downloads/index.php`. It scans the folder on every request, so the list is
always current and there is nothing to rebuild or edit. Dotfiles, subfolders, `index.php`
and `.htaccess` are skipped. `downloads/.htaccess` makes `index.php` the directory index,
disables raw directory listings, and adds the `noindex` header.

Download files are **not in git** (`.gitignore` excludes `public_html/downloads/*` except
`index.php` and `.htaccess`). They live only on the server, so deploys never add, change
or remove them.

### Adding or removing a download file

1. Name the file the way you want it to appear — the filename *is* the label on the page
   (e.g. `E4D Component v1.2.zip`). Spaces are fine.
2. Upload it to `public_html/downloads/` on the server, by FTP/SFTP or
   My20i → File Manager → Uploads. **Not** into `e4d-site/public_html/downloads/` — that
   folder is the git checkout and nothing serves it.
3. Reload `https://everything4d.com/downloads/`. The file is listed with its size and date.
4. To replace a file, upload over it with the same name. To retire one, delete it from the
   folder. No commit is needed for any of this.

Don't put `index.php` or `.htaccess` files of your own in there, and don't create
subfolders — they are ignored.

## Contact form

Posts to Formspree form `mzdqargo` (configured in `contact.html`). The delivery address is set in the Formspree dashboard, not in the HTML. Fields: name, email, company (optional), message.

## Editorial notes

- 4D Happy Hour ended in October 2026. It is referenced only in the past tense, on the About page.
- Client names on the site are limited to the two published testimonials (Waltons Direct, i.LEVEL). Case notes are anonymized; the large 4D installation is deliberately unnamed.
- Doug's original policy drafts linked a `/qbo/eula.html` that does not exist. If a QuickBooks EULA is written, add it to `public_html/` and link it from every page's footer.
