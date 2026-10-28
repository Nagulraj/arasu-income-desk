# அரசு · Arasu Officer Desk

A Tamil-first UI prototype for reviewing **income certificate applications (REV-103)** in a fictional Madurai South revenue office.

**Status:** working local frontend demo. No real citizen data, live AI integration, government-system integration, production authentication, GitHub publication, or verified live deployment. A Sites project has been registered, but not published. Do not submit its expected URL as a working deployment.

## Problem and users

Revenue officers must compare application details with supporting records while keeping older applications moving. Missing evidence and conflicting income figures can force repeated review. Citizens seeking education support are affected by delays; officers need a clear queue and reasons they can verify.

Arasu puts a prioritised queue, evidence, review assistance, and the officer's decision on one screen. Tamil is used for the interface and explanations. The fictional office and names do not represent actual people or government records.

## Run locally

Requires Python 3 and a current browser. No installation or build step is needed.

```sh
cd arasu-income-desk
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open **http://localhost:4173**. Serve through HTTP: opening index.html directly can block JavaScript modules.

Demo login:

- Email: `officer@arasu.demo`
- Password: `Demo@123`

These public credentials are a UI demonstration, not security. They are intentionally visible in the source and on the login screen. Anyone can bypass the client-side login; there are no protected records.

## UI and workflow

1. Log in to the Tamil workspace. Cards show pending, older, incomplete/conflicting, and completed counts.
2. Use queue filters or search by name, reference number, or village. The oldest applications appear first. Categories overlap; a case can be both old and incomplete.
3. Select a case. The detail panel shows income, occupation, purpose, a Tamil summary, evidence checks, and a suggested next action.
4. Open the documents tab to inspect fictional text evidence. Missing attachments are marked. Documents have a SAMPLE watermark.
5. Choose approve, return, or reject. A dialog requires a reason of at least 12 characters and officer confirmation before recording the action. The suggestion never triggers a decision.
6. Completed cases leave the queue and appear in history, with officer, timestamp, and reasons. Export all demo records as JSON. Reset the demo from history.

The layout adapts to desktop, tablet, and mobile widths. Semantic buttons, labelled inputs, native dialogs, visible focus states, and live feedback support keyboard use. Layout and assistive-technology behavior still need browser verification.

## What “AI assistance” means here

The UI demonstrates the assistance workflow with **deterministic rules and a Tamil summary template**, explicitly labelled in the interface. It does not call an AI model or perform OCR. This is a limitation against the full assignment's live AI requirement.

`dist/domain.js` contains the inspectable rules:

- Flag missing records in the five-document demo checklist.
- Compare the claimed annual income with the sample income evidence; flag any difference when that evidence is present.
- Suggest returning for clarification when either check flags an issue.
- Otherwise suggest considering approval after an officer verifies original evidence.
- Never automatically suggest rejection or infer fraud, eligibility, or authenticity.

The reference date is fixed at **28 October 2026** so demo ages and sorting are reproducible. Cases aged 15 days or more get queue priority; this is a prototype prioritisation choice, **not a claim about a statutory deadline**. Decision timestamps use the device's actual clock. Returned applications are completed items in this prototype; citizen corrections and resubmission are not implemented.

## Research and scope

Tamil Nadu's official e-Sevai material identifies income certificates as REV-103 and lists supporting documents:

- [Official e-Sevai service list](https://www.tnesevai.tn.gov.in/Pages/EsevaiServiceList.aspx)
- [Official e-Sevai FAQ and document guidance](https://tnesevai.tn.gov.in/Pages/FAQ.aspx)

Reviewed on 28 October 2026. The demo's five-item checklist is a **simplified subset**, not a complete or authoritative requirement. The official list includes occupation/property-related evidence such as salary, business, land, house, and PAN details. The demonstration includes an income statement for daily-wage workers as an invented sample artifact, not an assertion that it is officially sufficient. Confirm applicable requirements and current departmental rules before any real implementation.

## Technical decisions

- **HTML, CSS, native JavaScript modules:** a small, inspectable UI with no package downloads, framework runtime, build step, or API key. This supports a fast local demonstration. Larger production workflows would benefit from component tooling and a backend.
- **Separation of concerns:** `domain.js` owns data generation and review/decision rules; `app.js` owns screens and interactions; `style.css` owns responsive presentation.
- **Browser-local data:** localStorage holds fictional decisions; sessionStorage holds the demo login. No data is sent to a backend. Storage is editable, per browser, unaudited, and not suitable as an official record. Reset and export are available.
- **Human control:** decisions require a separate confirmation and reasons. The domain function blocks invalid actions and repeated decisions, and returns a new record instead of mutating the original.
- **Sample documents:** text previews make findings traceable without collecting files or storing citizen documents.
- **Typography:** Noto Sans Tamil is loaded from Google Fonts with system fallbacks. The font request is the only automatic external request in the app; application data is not included. If offline, install a Tamil font locally for good rendering.

## Verification

Tests can run with Node.js 18+ (no dependencies):

```sh
npm test
```

Or with GNOME JavaScript, which was available in the build environment:

```sh
gjs -m tests/domain.test.js
gjs -m tests/ui.test.js
```

Results: **21 domain assertions and 18 interaction assertions pass**. The interaction test uses a small fake DOM to check event wiring: login, case review, document preview, confirmation, saved history, guide, and logout. It does not validate HTML layout, native form validation, focus behavior, fonts, or browser compatibility.

Browser visual QA was blocked: the environment prevented opening a local server and display. External DNS also failed, Node.js was unavailable, and GitHub was unconnected. Publication was not completed. No screenshot or live URL is represented as verified.

Manual browser checks before submission:

- Log in with correct and incorrect demo credentials.
- Test search, all four filters, all detail tabs, document previews, and keyboard dialog dismissal.
- Return REV-103-2418 for missing income evidence; inspect the saved reason in history.
- Inspect REV-103-2419 for conflicting income figures.
- Approve a complete case such as REV-103-2423; test rejection with a reason on another case.
- Cancel a decision; ensure it remains pending. Test empty reason and unchecked confirmation.
- Reload to verify local persistence; export records; reset; test empty search results.
- Check desktop and 390px mobile layouts, Tamil text wrapping, visible focus, and contrast.

## Publishing

This is a static site. On Netlify or Cloudflare Pages, use **no build command** and publish directory **dist**. On GitHub Pages, publish the contents of `dist` to the Pages branch or configure a static artifact workflow. A browser-local demonstration can be tested by reviewers using the demo credentials above.

GitHub has not been connected in this session. To create the requested repository from a machine with GitHub CLI access:

```sh
gh auth login
gh repo create arasu-income-desk --public --source=. --remote=origin --push
```

A local Git repository and portable source ZIP are supplied. The `.openai/hosting.json` file retains the registered Sites identity; it contains no credential. Sites publication still requires its supported source-sync and deployment workflow from an environment with Node.js and network access. The registered site is private and unpublished; external reviewer access has not been configured.

## Production next steps

For a real pilot: departmental checklist validation and Tamil officer usability testing; server-side identity and roles; a transactional database with append-only audit events and concurrency control; secure document storage; resubmission workflows; and server-side AI using structured outputs with evidence references, evaluated Tamil responses, and a deterministic fallback. Model output must remain advisory and never call the decision operation. Real citizen data should not enter this demonstration.

## Files

```
dist/index.html       App entry and native dialogs
dist/style.css        Tamil dashboard and responsive login UI
dist/app.js           Rendering, filters, dialogs, persistence and export
dist/domain.js        Fictional cases, review rules and decision validation
tests/domain.test.js  Domain checks
tests/ui.test.js      Mock-DOM interaction checks
.openai/hosting.json  Registered, unpublished Sites project
```
