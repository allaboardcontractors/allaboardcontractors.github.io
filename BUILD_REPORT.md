# Build Report — All Aboard Contractors New Website
Built Nov 10, 2026. Source: live homepage HTML saved Nov 10, 2026 (`live-site-2026-11-10.html`) plus the prepped photo folder (`~/workspace/all-aboard/website-photos-2026-11-09/`).

## What was built

An Eleventy (11ty v3.1.8) static site in `~/workspace/all-aboard/new-website/`, with Decap CMS at `/admin/` (git-gateway backend, Netlify Identity). Build verified clean: `npm install` then `npx @11ty/eleventy` writes 3 pages and copies 37 files into `_site/` with no errors. Built output HTML parses with no errors and no unclosed tags.

## Exact pages

- `/` — Homepage. Hero ("We're All Aboard Contractors..."), stats (100% family owned, 2 certifications WBE and SBE, 6 services, $0 estimate), Our expertise (3 cards + 6 services), Featured projects (all 26), About (WBE/SBE), Process (4 steps), capability section, FAQ (7 questions), contact block with estimate form, footer.
- `/before-and-after/` — Before & After page. The 3 pairs side by side: chain link gate replacement, wood fence replacement, iron fence installation. Each pair shows the before photo and the after photo with its title and caption.
- `/admin/` — Decap CMS editor.

## Photos (33 files in `src/images/`, none hotlinked)

- 20 photos live on the current site: hero `iron-fence-finished.jpg`, capability `iron-fence-install-crew-2.jpg`, 12 new slider projects, 6 before/after pair photos.
- 10 originals downloaded from the current site: the 8 slider originals (`allaboard-wood-fence-finished.jpg`, `allaboard-sidewalk.jpg`, `allaboard-demolition-dump-truck.jpg`, `allaboard-iron-fence-install.jpg`, `allaboard-concrete-pour.jpg`, `allaboard-wood-fence-framing.jpg`, `allaboard-cleared-lot.jpg`, `allaboard-fence-crew.jpg`), plus `allaboard-demolition-excavator.jpg` (Site work card) and `allaboard-capability-statement.jpg` (linked by the capability button).
- 3 of her own crew photos replace the 3 Pexels stock shots: `iron-fence-install-crew-3.jpg` (expertise band), `iron-fence-install-crew-5.jpg` (Property care card), `iron-fence-install-level-2.jpg` (About photo).
- Not used, per the brief: all Ferrel Fence night shots, the yard sign photo, and the 3 Pexels stock photos.

## How the editor works

Decap CMS at `/admin/`, backend `git-gateway` with Netlify Identity. Three collections:

- **Site Settings** — phone numbers (main and second line), email, office address, tagline, social links.
- **Homepage** — every homepage section: hero, stats, expertise cards and services list, all 26 projects (add, remove, reorder, swap photos), About, Process, capability section, FAQ, contact heading, footer headline.
- **Pages** — folder collection at `src/pages/` with create enabled, so Shante can make new pages herself. Page styles: Standard page, or Before and After page (with a before/after pairs list). The Before & After page is one of these pages, so its pairs are editable there.

Saving in the editor commits to the Git repo and Netlify rebuilds the live site (about a minute). Setup steps (Identity invite-only + Git Gateway) are in `README.md`.

## What could not be reproduced, and why

- **Meta description and search descriptions mentioning DBE.** The live HTML's meta description and Open Graph description still say "WBE, SBE and DBE". The brief forbids DBE anywhere, and the Nov 9 fix removed DBE from all visible copy, so the new site corrects these two tags to WBE and SBE only. The letters DBE appear nowhere in the new site.
- **Pexels og:image.** The live page's social share image is a Pexels photo. It was replaced with her own hero photo (`iron-fence-finished.jpg`).
- **The 3 Pexels photos in the page body** (expertise band, Property care card, About photo). Replaced with her own crew photos, as listed above. No stock photo is used anywhere.
- **The capability statement link.** The live site links the button to `/images/allaboard-capability-statement.jpg`. That file was downloaded and is included in the new site, so the button works the same way.

## Not done (out of scope, per the brief)

- Nothing deployed, published, or moved. No domain change. No contact with Jon.
- Netlify Identity and Git Gateway are configured in the code (`config.yml`, `netlify.toml`, Identity widget on the site and admin page) but cannot be turned on until the project is in a repo and connected to a Netlify site, which is a deploy-time step for Shante.
