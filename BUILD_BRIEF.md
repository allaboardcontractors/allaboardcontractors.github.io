# All Aboard Contractors — New Website Build Brief
Owner: Shante Kelley. Goal: a brand-new site she fully owns, built from scratch, with an editor she can use herself. It replaces allaboardcontractors.com (currently built by Jon, code in his accounts). Do NOT contact Jon. Do NOT touch the live site.

## Source of truth for content
- `live-site-2026-11-10.html` in this folder is the exact current live homepage HTML (saved Nov 10, 2026). Reproduce ALL of its copy faithfully: hero headline, stats (100% family owned, 2 certifications WBE and SBE, 6 services, $0 estimate), Our expertise (3 cards + 6 services list), Featured projects (all 26), About (WBE/SBE), Process (4 steps), capability section, FAQ (6 questions), contact block, footer. Do not invent new copy. Do not change phone numbers, prices, or claims.
- Key facts (never change): main phone (281) 938-9550; second phone 832-270-1410 (James's line); email shantekelley@allaboardcontractors.com; office 3218 Rockrill Dr, Houston, TX 77045; certifications WBE and SBE ONLY — never mention DBE anywhere; tagline "Your project. Our solutions. A certified WBE and SBE contractor serving Houston and surrounding areas."
- Services: land clearing/site prep, demolition, concrete, fencing and gates, tree services, property preservation, landscaping.

## Photos
- New fence photos (already prepped, under 1 MB, in `~/workspace/all-aboard/website-photos-2026-11-09/` with `manifest.json` giving file, type, description, dimensions): use the 20 that are live now — hero `iron-fence-finished.jpg`, capability `iron-fence-install-crew-2.jpg`, and the 18 slider projects (12 new + 6 before/after pairs). Exact titles, captions, descriptions and order are in the live HTML (images 12-29) — copy them exactly.
- The 8 original projects (wood fence installation, sidewalk repair, structure demolition, iron fence installation, concrete flatwork, wood fence framing, lot clearing and grading, crew on a fence build) use `allaboard-*.jpg` files that live on the current site at `https://allaboardcontractors.com/images/allaboard-*.jpg`. Download those 8 images into the new site's images folder. Also download `allaboard-demolition-excavator.jpg`, `allaboard-concrete-pour.jpg`, `allaboard-capability-statement.jpg` (referenced in the live HTML) if present.
- The 3 Pexels stock photos on the current site (hero old photo 30354001, chainsaw 6218318, blueprints 3862384) are NOT her work. Do NOT reuse them. The expertise-section band photo (30354001) should be replaced with one of her own crew/equipment photos.
- Do NOT use any photo showing another company's branding. Do NOT use the yard-sign photo (it lists REMODEL, out of scope).

## New pages (this is the point of the rebuild)
- Add a **Before & After** page (`/before-and-after/`) showing the 3 before/after pairs side by side (chain link gate, wood fence, iron fence), each with its before and after photo, title and caption.
- Add a **Pages collection** in the editor so Shante can create new pages herself in future (the old editor could not do this).

## Tech stack (must support the editor + free hosting + custom domain)
- Static site built with **Eleventy (11ty)**. Content in Markdown/JSON data files that Decap CMS edits. Templates in Nunjucks/HTML.
- **Decap CMS** editor at `/admin/` with `config.yml`: collections for the homepage sections (hero, expertise, services, projects, about, process, capability, FAQ, contact/footer) AND a Pages collection (for new pages, including Before & After). Backend `git-gateway`, so it works with Netlify Identity. Include the Netlify Identity widget script on the admin page and the main site (for invite/password-reset flows).
- `netlify.toml` with the Eleventy build command and publish directory, plus a `_redirects` or equivalent so `/admin/` works.
- A `README.md` in the project explaining: how to run it locally, how to deploy to Netlify, how to enable Netlify Identity + Git Gateway, and how Shante logs in to the editor.
- Design: clean, professional contractor site. Match the current site's structure and spirit (navy/blue + gold accents are her brand colors; see the live HTML classes for the current palette). Mobile-friendly. No lorem ipsum, no placeholder text.

## Deliverables (all inside `~/workspace/all-aboard/new-website/`)
1. Complete Eleventy project that builds cleanly (`npm install` + `npx @11ty/eleventy` produces the site in the publish dir). Verify the build runs with no errors before reporting done.
2. All images in the project (no hotlinking to the old site or Pexels).
3. Decap CMS config that covers every editable section plus the Pages collection.
4. A short build report: what was built, the exact pages, how the editor works, and anything you could not reproduce (with the reason).

## Constraints
- Do not publish, deploy, or move any domain. Building files only.
- Do not use any photo, text, or claim that is not in the live HTML or the prepped photo folder.
- Keep the zero-dash rule in mind for any user-facing copy you write (no hyphens or dashes in headlines, captions, or body text you author); existing approved copy stays as-is.
