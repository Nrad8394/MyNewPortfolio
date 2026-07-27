# Security Audit — MyNewPortfolio

Date: 2026-07-27 · Scope: full repo (`Nrad8394/MyNewPortfolio`, public) at commit `ecf7af3`
Hosting: **Next.js static export on free cPanel/Apache** — preserved as-is.
Verified with: clean `npm run build` (101-file static export), `tsc --noEmit`, `npm audit`, and a
grep of every exported file.

---

## The core problem

**A static site has no server, so it can hold no secrets.** Every value the app is built with ends
up in the JavaScript bundle, readable by any visitor. That is not a bug to patch — it is what
static hosting means, and it is exactly how a live OpenRouter key ended up being served to the
public.

That leaves two honest options for a chat widget on this hosting, and the owner chose the second:

| | Proxy on a free serverless tier | **Public key in the bundle (chosen)** |
|---|---|---|
| Key readable by visitors | No | **Yes** |
| Deployments to maintain | 2 | 1 |
| Chat widget works | Yes | Yes |

A working proxy was built and then removed at the owner's request — one deployment was the
priority. What remains is a single static site that calls OpenRouter directly from the browser.

### What that costs you (accepted risk)

The key **is public**. Anyone can open devtools, copy it, and spend your OpenRouter credit. Assume
it will be scraped eventually — bots harvest keys from JS bundles, not just from GitHub.

This is still meaningfully better than the original code, because the key is no longer committed to
git history, is rotatable by editing one env var, and can be scoped and capped. But it is **not**
safe, and no amount of code makes it safe. The controls that matter are account settings:

1. **A hard credit limit on the key** — <https://openrouter.ai/settings/keys>. This converts an
   unbounded liability into a fixed, small one. Do this before deploying.
2. **A key dedicated to this site**, so rotating it breaks nothing else.
3. **Watch usage** and rotate on anything unexpected (one line in `portfolio/.env` + a rebuild).

If the cost ever becomes a problem, the fix is a server-side proxy — see §8.

---

## 1. CRITICAL — Live OpenRouter API key hardcoded in a client component

`portfolio/components/chat-bot.tsx:88`

```js
const apiKey = "sk-or-v1-f403d4a9…df31de";
```

A `"use client"` component, so the key was compiled into the bundle and served to every visitor —
readable via devtools on the live site. The repo is also public, so it was scrapeable straight from
GitHub; automated scanners find `sk-or-v1-` keys in public repos within minutes.

**Three keys exist in total:**

| Key | Where | Status |
|---|---|---|
| `sk-or-v1-f403d4a9…df31de` | commits `ecf7af3`, `d475ab8`, `197e506` | **public — revoke** |
| `sk-or-v1-913aee6a…ff6de1` | commits `0d98c8a`, `8dd32dd` | **public — revoke** |
| `sk-or-v1-577de3ab…3d92f3` | `portfolio/.env` → the built bundle | never committed, but **public by choice** — cap it |

The third one was added locally during this audit and was never committed (`git log` confirms
`portfolio/.env` was never tracked). It is now wired as `NEXT_PUBLIC_OPENROUTER_API_KEY`, so it
ships in the bundle deliberately.

**Changed:** the hardcoded literal is gone from source. The key now comes from a gitignored env var.
It is still present in the built bundle — verified at `out/_next/static/chunks/app/layout-*.js` —
which is expected and accepted.

What that buys, precisely:

| | Before | Now |
|---|---|---|
| In git history forever | Yes | **No** |
| Readable by site visitors | Yes | **Yes** — accepted |
| Rotate without a code change | No | **Yes** |
| Can be credit-capped and scoped | Not in practice | **Yes** |

Also hardened on the client: `max_tokens: 500` and only the last 10 conversation turns are sent.
These do not stop someone who has stolen the key, but they cap normal usage and runaway loops.

Verified that no `.env` holding a real value is committable: `portfolio/.env` is matched by
`portfolio/.gitignore:20`, and `git status --untracked-files=all` lists only the valueless
`.env.example` template.

> ### ⚠️ ACTION REQUIRED BY YOU
> 1. **Revoke the first two keys** at <https://openrouter.ai/settings/keys>. Per your decision we
>    did not rewrite git history, so both strings remain readable in those five commits and in any
>    clone or fork. Revocation is what closes this — the code change alone does not.
> 2. **Set a hard credit limit on the third key.** It is published to every visitor on purpose.
>    The cap is the only thing bounding what a stranger can spend.

---

## 2. HIGH — The old chat route was an unauthenticated, unbounded LLM proxy

`portfolio/app/api/chat/route.ts` forwarded the client's `messages` array to the model with no
validation and no output cap. Anyone could `curl` it with an injected `system` role and use your
OpenRouter balance for free inference.

Separately, **that route could never have run at all** — Next silently drops route handlers from a
static export (confirmed: no `api/` directory in `out/`). It was dead code, which is why the client
was calling OpenRouter directly in the first place.

**Fixed:** deleted. Nothing replaces it; the browser now calls OpenRouter directly (see above).

---

## 3. HIGH — `.htaccess` began with an invalid directive

`portfolio/public/.htaccess` line 2 was:

```
text/x-generic .htaccess ( UTF-8 Unicode text, with CRLF line terminators )
```

That is not an Apache directive — it is stray output from a `file` command that got pasted into the
file. Apache aborts with **HTTP 500 Internal Server Error** on an unrecognised directive, so this
line would take down every page the file governs. Check your Apache error log for
`Invalid command 'text/x-generic'`.

**Fixed:** removed. Since this file is your only place to set response headers (see §6.4), it now
also carries the security headers and a rule denying access to dotfiles and stray `.env`/key files.

---

## 4. MEDIUM — EmailJS credentials hardcoded

`portfolio/app/contact/page.tsx:34-36` had the service ID, template ID, and public key inline.

These are browser-visible **by design** — EmailJS is a client-side service, and you will still see
them in the bundle after this change. That is expected and not a leak. The real risk is a third
party lifting the trio to send mail through your account, burning quota and spoofing your form.

**Fixed:** moved to `NEXT_PUBLIC_EMAILJS_*` vars so they are rotatable without a code change, with
a guard that shows a fallback message instead of silently failing when unset.

> **Action:** enable the **domain allowlist** in the EmailJS dashboard and restrict it to your
> domain. That is the only control that actually stops reuse — env vars do not hide these.

---

## 5. MEDIUM — Dependency vulnerabilities

Before: **46 vulnerabilities (5 critical, 18 high, 16 moderate, 7 low)**
After: **6 vulnerabilities (6 high, 0 critical)**

Most of the exposure came from packages declared but never imported anywhere — `react-native`,
`expo`, `expo-asset`, `expo-file-system`, `expo-gl` (a React Native toolchain in a web project),
plus `ai`, `openai-edge`, and `openai` itself, all unused now that the browser calls OpenRouter with
plain `fetch`. Removed after confirming zero imports.

Also fixed:
- `next` `14.2.16` → `^14.2.35`, picking up the **middleware authorization-bypass** fix
  (GHSA-f82v-jwr5-mffw / CVE-2025-29927) and ~20 others.
- `tailwindcss` was in **both** `dependencies` (`latest`) and `devDependencies` (`^3.4.17`). The
  `latest` entry resolves Tailwind v4, which does not read your v3 `tailwind.config.ts`. Removed
  the duplicate.
- `date-fns@4.1.0` conflicted with `react-day-picker@8.10.1`'s peer range (`^2 || ^3`), so
  **`npm install` failed outright** on a clean checkout. Pinned to `^3.6.0`; install is clean now.

**Remaining 6:** all Next.js 14.x advisories that only clear by upgrading to Next 16 — a major
version bump, out of scope here. Your real exposure is very low: as a static export you ship no
middleware, no Server Actions, no image optimizer and no server at all, which is what essentially
all of those advisories target.

**Supply-chain note (not fixed):** 15 dependencies are pinned to `"latest"`. Builds are not
reproducible and a compromised release lands in your site with no review. Pin these to real
semver ranges.

---

## 6. LOW — findings worth knowing

| # | Finding | Detail |
|---|---|---|
| 6.1 | Unsandboxed code execution | `components/code-playground.tsx:27` runs visitor-typed JS via `new Function(code)()` in the page origin. Self-inflicted only — not URL-driven, so not shareable as an attack. If you ever seed it from a query param it becomes stored XSS. Proper fix: `<iframe sandbox="allow-scripts">`. |
| 6.2 | Date of birth in the AI prompt | `2004-03-31` was in the chatbot system prompt, shipped to the browser. Removed — a common identity-verification factor, and it served no purpose. |
| 6.3 | Tabnabbing | Two `target="_blank"` links on the contact page lacked `rel="noopener noreferrer"`. Fixed; the rest of the codebase already had it. |
| 6.4 | No security headers | Nothing set framing, sniffing, or referrer policy. Added to `public/.htaccess` — **not** `next.config.mjs`, because Next ignores `headers()` under `output: "export"`. HSTS is wrapped in an `%{HTTPS} == 'on'` guard so it cannot lock you out over plain HTTP. No CSP: Monaco and three.js need careful policy work — follow-up. |
| 6.5 | Two competing Next configs | `next.config.js` and `next.config.mjs` both existed; Next loads only the `.js`, so the `.mjs` was dead — including a merge shim importing `./v0-user-next.config`, a file that does not exist. Consolidated into one `.mjs` that keeps `output: "export"`. |
| 6.6 | `eslint.ignoreDuringBuilds: true` | Left on: `eslint` and `eslint-config-next` are not in `devDependencies`, so `npm run lint` fails today. Install them, then flip this off. |
| 6.7 | `typescript.ignoreBuildErrors: true` | **Turned off.** `tsc --noEmit` reports zero errors, so it was masking nothing — no reason to let future type errors ship. |
| 6.8 | `portfolio.zip` committed (283 KB) | A stale duplicate of the source tree already tracked in `portfolio/`. Scanned — **no secrets inside**. **Removed** from the repo at the owner's request, and `*.zip` added to `.gitignore` so archives are not committed again. |
| 6.9 | No env documentation | Added `portfolio/.env.example`, explicit that every value in it is public. |
| 6.10 | **Cold builds failed ~2 in 3 times** | `experimental.webpackBuildWorker` + `parallelServerCompiles` + `parallelServerBuildTraces` caused nondeterministic export failures (`Cannot read properties of undefined (reading 'call')`, `Cannot find module for page: /_document \| /_error \| /_not-found`). Reproduced on the original `layout.tsx`, so it predated all changes here — a race between parallel webpack workers, not app code. **Removed the flags; verified 7/7 clean cold builds after.** Not a security issue, but it meant a deploy could silently ship a partial `out/`. |
| 6.11 | Chatbot model slug was dead | `mistralai/mistral-7b-instruct` returns `404 No endpoints found` — the slug was withdrawn from OpenRouter, so the widget was broken in production. Switched to `openrouter/free` (a router over free models), which also means **the public key can no longer spend money** — worst case is rate-limiting. Error handling now surfaces the real API message instead of a generic "Failed to fetch response". |

---

## 7. What changed

| File | Change |
|---|---|
| `portfolio/components/chat-bot.tsx` | Hardcoded key → `NEXT_PUBLIC_OPENROUTER_API_KEY`; `max_tokens` and 10-turn history caps; hides itself if unset |
| `portfolio/app/api/chat/route.ts` | **Deleted** — unvalidated proxy, and dead code in a static export |
| `portfolio/app/contact/page.tsx` | EmailJS creds → env vars; `rel="noopener noreferrer"` added |
| `portfolio/next.config.mjs` | Consolidated; keeps `output: "export"`; `ignoreBuildErrors` off |
| `portfolio/next.config.js` | **Deleted** — duplicate config; its `output: "export"` moved into the `.mjs` |
| `portfolio/public/.htaccess` | Invalid directive removed; security headers + dotfile denial added |
| `portfolio/package.json` | Removed 8 unused deps, bumped Next, fixed Tailwind + date-fns conflicts |
| `portfolio/.env` | Holds the public key with the exposure documented inline; gitignored |
| `portfolio/.env.example` | **New** — documents all four vars and that all are public |
| `portfolio.zip` | **Deleted** — redundant source archive; `*.zip` now gitignored |
| `.gitignore`, `portfolio/.gitignore` | Broadened to `.env*` (keeping `.env.example`), plus key-material and `*.zip` patterns |

**Verified:** static export builds to 101 files with all 11 routes prerendered; `tsc --noEmit`
clean; security headers present in the exported `.htaccess`; no `.env` holding a real value is
committable. The OpenRouter key **is** in `out/_next/static/chunks/app/layout-*.js` — expected and
accepted.

---

## 8. Your checklist

1. **Revoke the two keys that are in git history** — <https://openrouter.ai/settings/keys>.
   Nothing else here matters until this is done.
2. **Set a hard credit limit on the key in `portfolio/.env`.** It is published to every visitor by
   design. This cap is the entire mitigation — treat it as part of the work, not an optional extra.
3. Deploy: `npm run build` in `portfolio/`, upload the contents of `portfolio/out/` to cPanel.
4. Enable the **EmailJS domain allowlist** at <https://dashboard.emailjs.com/>.
5. Turn on **GitHub secret scanning + push protection** (Settings → Code security). Note this will
   not see `portfolio/.env`, which is gitignored — it is your backstop against a future hardcoded
   string.
6. Check the Apache error log for `Invalid command 'text/x-generic'` (see §3) to confirm whether
   that line was breaking your live site.
7. Periodically check OpenRouter usage. Rotate the key on anything unexpected — one line in
   `portfolio/.env` plus a rebuild.
8. Optional: pin the `"latest"` deps, sandbox the code playground.

### If the public key ever becomes a problem

The only real fix is to stop shipping it: put a small server-side proxy on a free serverless tier
(Vercel, Cloudflare Workers), have it hold the key and enforce an origin allowlist, and point the
widget at its URL instead. That is roughly one file plus a deployment. Until then, the credit limit
is doing all the work.

Cheaper stopgaps if you just want to reduce noise: disable the widget by blanking
`NEXT_PUBLIC_OPENROUTER_API_KEY` (it hides itself, nothing else changes), or move to a cheaper
model.
