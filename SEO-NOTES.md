# SEO Notes

Date: 2026-07-27 · Static export on cPanel/Apache.
Verified against the built output in `portfolio/out/`, not just the source.

---

## What was wrong

**1. Every page shared one title and description.** All 11 pages are `"use client"`, and a client
component cannot export `metadata`. So Google saw 11 pages titled
"Karanja Benjamin | Software Engineer & Tech Enthusiast" with identical descriptions — nothing to
distinguish them, and no keyword signal per page.

**2. `metadataBase` was unset.** Your `openGraph.images` and `twitter.images` used the relative path
`/assets/portfolio.png`, which Next resolved against `http://localhost:3000`. **Every link preview
on LinkedIn, WhatsApp and Twitter was pointing at localhost** — i.e. no image at all. This was also
the warning firing 7× in every build.

**3. `next/head` in the App Router.** It renders nothing there, so the `preconnect` hint it
contained never reached the browser. (No loss: `next/font` self-hosts Inter at build time, so there
was nothing to preconnect to.)

**4. `themeColor` was in the wrong export**, so it was silently dropped. It has its own `viewport`
export in the App Router.

**5. No sitemap, no robots.txt, no structured data.**

---

## What was done

| Change | Where |
|---|---|
| Unique title + description + canonical per page | `app/<route>/layout.tsx` (9 new files) |
| Title template `%s \| Karanja Benjamin` | `app/layout.tsx` |
| `metadataBase` set — fixes all link previews | `app/layout.tsx` |
| `viewport` export with `themeColor` | `app/layout.tsx` |
| `next/head` removed | `app/layout.tsx` |
| JSON-LD `Person` + `WebSite` structured data | `app/layout.tsx` |
| `sitemap.xml` (10 URLs) | `public/sitemap.xml` |
| `robots.txt` | `public/robots.txt` |
| Real keywords, `authors`, `creator`, `robots` directives | `app/layout.tsx` |
| Single source of truth for URLs and author identity | `lib/site.ts` |

Each page is a `layout.tsx` wrapper because the pages themselves are client components — this is the
standard workaround and needed no changes to your page code.

**Verified in `portfolio/out/`:** 11 unique `<title>` values, per-page `<meta name="description">`,
absolute `<link rel="canonical">` and `og:url` on every page, both JSON-LD blocks parse as valid
JSON, and `sitemap.xml` parses with 10 URLs.

### Why sitemap/robots are static files, not `app/sitemap.ts`

Next can generate them, but for 10 fixed routes it buys nothing and adds a build step. They are
plain files in `public/`, copied verbatim into `out/`. **If you add or rename a route, update
`public/sitemap.xml` by hand.**

---

## Needs your decision: `/` duplicates every other page

`app/page.tsx` imports and renders all nine other pages:

```tsx
import Home from "@/app/home/page"
import About from "@/app/about/page"
// ...7 more
```

So every piece of content exists at two URLs — `/` and its own route. Google has to pick which to
rank, and the two versions compete for the same signals. This is the biggest remaining SEO issue and
it is an architecture choice, so it is left to you. Three options:

1. **Keep `/` as the single-page experience, drop the separate routes from the index.**
   Add `robots: { index: false }` to each route layout and remove them from `sitemap.xml`. All
   ranking consolidates on `/`. Simplest, but you lose per-topic pages that could each rank for
   different queries.
2. **Keep the separate routes as canonical, make `/` a real landing page.**
   Change `app/page.tsx` to a genuine hero/summary that links out, instead of inlining nine pages.
   Best long-term SEO — nine pages that can each rank — but it is a redesign of your index.
3. **Leave as-is.** Not fatal. Canonicals are self-referencing so nothing is broken; you are just
   splitting authority between `/` and `/home` etc.

Recommendation: **option 2** if you want search traffic, **option 1** if you like the current
one-page feel. Right now you have the downsides of both.

Note `/` and `/home` are near-identical even ignoring this — consider dropping `/home` entirely.

---

## Before this ranks: things only you can do

1. **Google Search Console** — <https://search.google.com/search-console>. Verify the domain,
   submit `https://karanjasoftwareengineer.great-site.net/sitemap.xml`, then "Request indexing" for
   the homepage. Without this, expect to wait weeks.
2. **Check the free host doesn't block crawlers.** Free tiers (including `.great-site.net`) often
   serve an interstitial, a JS challenge, or ads to non-browser user agents. If Googlebot gets that
   instead of your HTML, **nothing else in this document matters.** Test with Search Console's URL
   Inspection → "View crawled page" and confirm it sees your real markup.
3. **A custom domain** would help more than any code change here. Free-host subdomains carry little
   trust and cannot be moved with you. When you get one, set `NEXT_PUBLIC_SITE_URL` in
   `portfolio/.env`, update `public/sitemap.xml` and `public/robots.txt`, and rebuild.
4. **HTTPS.** Confirm the site serves over HTTPS and that HTTP redirects to it. The HSTS header in
   `.htaccess` is already guarded to only apply over HTTPS.
5. **Verify link previews** once deployed: <https://www.linkedin.com/post-inspector/> and
   <https://cards-dev.twitter.com/validator>. They should now show `/assets/portfolio.png`.
6. **Test the structured data**: <https://search.google.com/test/rich-results>.

---

## Smaller things worth doing later

- **`og:image` is a screenshot of the site.** A 1200×630 image with your name and role as legible
  text converts better in shares.
- **Image alt text** — audit the project cards and `picture.jpg`; descriptive alt text is both an
  accessibility and image-search win.
- **The blog is the only real ranking opportunity here.** A portfolio has ~10 pages and thin
  keyword surface; articles are what attract search traffic. If you write posts, give each its own
  route with its own metadata and `type: "article"`.
- **`lib/site.ts` holds the author identity** used by JSON-LD. Keep `sameAs` (GitHub, LinkedIn)
  accurate — those links are how Google connects the site to you as an entity.
- One dead LinkedIn URL was removed from metadata (`/in/karanja-benjamin`); the correct one
  (`/in/benjamin-karanja-93852523b`, matching your contact page) is now the only one used.
