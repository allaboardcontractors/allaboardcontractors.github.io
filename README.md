# All Aboard Contractors — New Website

A brand-new website for All Aboard Contractors, built from scratch and fully owned by Shante Kelley. It replaces the old site at allaboardcontractors.com, which was built by Jon and lives in his accounts.

Static site built with **Eleventy (11ty)**, edited with **Decap CMS**, hosted free on **Netlify**.

## Pages

- `/` — Homepage: hero, stats, Our expertise (3 cards + 6 services), Featured projects (26 photos), About, Process, capability section, FAQ, contact form, footer
- `/before-and-after/` — Before & After: the 3 before/after pairs side by side (chain link gate, wood fence, iron fence)
- `/admin/` — Content editor (Decap CMS)

## Run it locally

```bash
npm install
npm start
```

Then open http://localhost:8080. `npm run build` builds the site into `_site/`.

## Deploy to Netlify

1. Put this project in a GitHub repository (see "Moving the code" below).
2. In Netlify, choose **Add new site → Import an existing project**, pick the repo.
3. Build command: `npm run build`. Publish directory: `_site`. Node version 20 is set in `netlify.toml`.
4. Netlify gives the site a free address like `something.netlify.app`. Check the site there first.
5. Only when the new site is approved, point the domain at it (see "Moving the domain" below).

## Enable the editor (Netlify Identity + Git Gateway)

The editor at `/admin/` only works after these two are turned on in Netlify. Do this once, on the new Netlify site:

1. **Site configuration → Identity → Enable Identity.**
2. Under Identity, set **Registration** to **Invite only** and turn off external providers (GitHub, Google, etc.), so only invited people can log in.
3. **Site configuration → Identity → Services → Git Gateway → Enable.** This lets the editor save changes back to the GitHub repo.
4. **Identity → Invite users** and invite `shantekelley@allaboardcontractors.com`. She gets an email, clicks the link, sets her password, and is taken to the editor.

## How Shante logs in to the editor

1. Go to `https://www.allaboardcontractors.com/admin/` (or the Netlify address before the domain moves).
2. Log in with her email and the password she set from the invite.
3. Pick a section on the left: **Site Settings** (phone, email, address, tagline, social links), **Homepage** (every section on the home page, including all 26 projects), or **Pages** (create and edit pages, including Before & After).
4. Change text or swap a photo, then press **Publish**. The change is saved to the repo and Netlify rebuilds the live site in about a minute.

## Moving the code

This project is the code. Keep it in a GitHub account Shante controls, not in anyone else's account. The repo is the thing that makes the site hers: Netlify builds from it, and the editor saves to it.

## Moving the domain

The domain `allaboardcontractors.com` is registered through Wix.com Ltd. (expires Sep 19, 2027) and its DNS is at Wix, currently pointing at the old Netlify site. Do not move it until the new site is built and approved. When ready:

1. In Netlify, add the custom domain `allaboardcontractors.com` (and `www.allaboardcontractors.com`) to the new site.
2. In Wix DNS, change the records to the ones Netlify shows for the new site.
3. Wait for the change to spread (usually minutes, up to a day), then check the live site.

## Project layout

```
.eleventy.js            Eleventy settings
netlify.toml            Netlify build settings
package.json            Dependencies and scripts
src/
  index.njk             Homepage template
  pages/                Pages (Before & After lives here)
  _data/
    site.json           Phone, email, address, tagline, social links
    homepage.json       All homepage content (hero, services, 26 projects, FAQ...)
  _includes/
    layouts/            Page templates (base, standard page, before and after)
    sprite.njk          Logo and icon graphics
  assets/css/style.css  Site styles
  assets/js/main.js     Menu, project slider, estimate form
  images/               All photos (33). Every photo is her own work.
  admin/
    index.html          Editor page
    config.yml          Editor setup (what Shante can edit)
```

## Notes

- Certifications are WBE and SBE only. The letters DBE do not appear anywhere on this site, including page titles and search descriptions.
- Every photo is her own work. No stock photos, no photos showing another company's branding, no yard sign photo.
- The estimate form needs no server: it opens the visitor's email app with the request filled in, addressed to shantekelley@allaboardcontractors.com.
- The old site is not touched by this project. Nothing here publishes, deploys, or moves a domain on its own.
