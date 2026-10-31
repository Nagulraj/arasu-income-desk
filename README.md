# Arasu Officer Desk

Arasu is an English-language workspace for reviewing **income certificate applications (REV-103)**. It demonstrates how a revenue officer can prioritise applications, inspect supporting evidence, identify missing or conflicting information, and record a decision with a clear reason.

The interface represents a fictional **Namakkal revenue office**. All applicants, records, and document previews are demonstration data. The sample villages are illustrative and are not an authoritative list of Namakkal locations.

## The idea and the problem it addresses

Income certificate reviews involve comparing an applicant's declared income with supporting records, checking attachments, and deciding whether to approve, request clarification, or reject an application. When those details are scattered, officers may repeat checks, overlook older cases, or leave unclear explanations for decisions.

Arasu brings the queue, applicant information, evidence, assistance, and decision controls into one workspace. Its intended benefits are more organised reviews, clearer follow-up, and traceable decisions. These are design goals, not measured claims about processing speed or accuracy.

**Technology assists the review; the officer makes the final decision.**

## Current scope

This repository contains a working local frontend prototype with 12 fictional applications. It uses HTML, CSS, and native JavaScript modules, with no backend or build step.

- The interface, built-in records, and review guidance are in English.
- The login is a client-side demonstration, not secure authentication.
- The panel labelled “AI review assistance” uses deterministic rules and a summary template. It does not call an AI model or perform OCR.
- Documents are fictional text previews, not uploaded or verified files.
- Decisions are stored in the current browser, not a central database.
- The app does not issue certificates or connect to government systems.
- Citizen submission, corrections, resubmission, and multi-officer collaboration are not implemented.
- No live deployment is verified. The Sites identity in `.openai/hosting.json` is registration metadata, not evidence of a published website.

## Setup and run

### Requirements

- **Python 3** to serve the app locally.
- A current browser with JavaScript, ES modules, native dialogs, and browser storage enabled.
- Optional: **Node.js 18+ and npm** to run the package scripts and automated tests.

No dependency installation, API key, environment file, database setup, or compilation is required. The files in `dist/` are the editable application source served directly to the browser.

### Start with Python

Open a terminal in the project directory:

```bash
cd /home/nagul/arasu-income-desk
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

If you copied the project elsewhere, use that directory instead.

Keep the terminal running and open **http://localhost:4173** in your browser. Press **Ctrl+C** in the terminal to stop the server.

Serve the app over HTTP. Opening `dist/index.html` directly through a `file://` URL can prevent JavaScript modules from loading.

### Start with npm

If Node.js, npm, and Python 3 are available:

```bash
npm start
```

This runs the same Python server. There is no need to run `npm install`.

### Sign in

| Field | Demo value |
| --- | --- |
| Email | `officer@arasu.demo` |
| Password | `Demo@123` |

The login fields are prefilled. The separate “Demo access” information container has been removed from the login page, but the credentials remain documented here for reviewers.

These public credentials only demonstrate the login flow. The records are not protected by server-side authentication.

## How the application works

1. **Sign in.** Enter the demo credentials to open the Namakkal officer workspace.
2. **Understand the workload.** Dashboard cards show pending, priority, clarification-needed, and completed counts.
3. **Choose a case.** Search or filter the queue. Pending applications are sorted by waiting time, oldest first.
4. **Read the application.** Check declared annual income, occupation, family size, submission date, and certificate purpose.
5. **Inspect the evidence.** Open the Documents tab and view the fictional supporting records. Missing attachments are marked.
6. **Evaluate the findings.** Review missing-document and income-mismatch notices. Treat the suggested action as advisory.
7. **Record a decision.** Choose Approve, Return, or Reject. Enter a reason of at least 12 characters and confirm that you reviewed the documents.
8. **Inspect the history.** The completed application leaves the pending queue and appears in Decision history with its outcome, reason, officer, and timestamp.
9. **Export or reset when needed.** Download all demo records as JSON, or restore the original sample dataset from history.

### Example walkthrough

- Open **REV-103-2418**. Its income evidence is missing. Inspect the document list and return it with a reason such as “Please attach the missing income evidence.”
- Open **REV-103-2419**. The declared annual income is ₹144,000, while the sample evidence shows ₹168,000. The assistance panel flags the difference for clarification.
- Open **REV-103-2423**. Its sample checklist is complete and its income figures match. Review the previews before considering approval.
- Open Decision history to inspect any recorded action. Reset the demo to repeat the walkthrough.

## Features explained

| Feature | What it does and why it helps |
| --- | --- |
| Officer login and logout | Demonstrate entering and leaving the officer workspace. The login state uses sessionStorage. |
| Namakkal office identity | Shows the office context in the login and workspace. It is presentation text, not an office-routing system. |
| Dashboard cards | Summarise pending applications, priority cases, cases needing clarification, and completed decisions. Cards also open the relevant queue or history view. |
| Application queue | Displays reference number, applicant name, village, family size, waiting time, declared income, and a review badge. Older pending applications appear first. |
| Priority indicator | Highlights applications waiting 15 days or more. This is a demo workflow rule, not a statutory deadline. |
| Search | Finds pending applications by name, reference number, or village. Search is case-insensitive and works together with the selected filter. |
| Queue filters | Show All, Priority, Needs attention, or Ready cases. Categories overlap: a case can be both old and incomplete. |
| Application details | Bring declared annual income, submission date, occupation, and purpose together in one panel. |
| Applicant summary | Produces an English summary from the applicant's stored details using a template. |
| Review assistance | Detects missing checklist documents and differences between declared and evidenced income. It does not determine authenticity, fraud, or legal eligibility. |
| Suggested next action | Suggests returning for clarification when an issue exists; otherwise suggests considering approval after officer verification. It never records a decision or automatically suggests rejection. |
| Documents tab | Lists the five-document demo checklist and marks missing attachments. |
| Document preview | Opens fictional text evidence with a DEMO / SAMPLE watermark so findings can be inspected. It is not a PDF viewer or upload system. |
| Activity tab | Shows the sample submission and pending-review stages. Completed decision records appear separately in history. |
| Approve | Records approval after the officer provides a reason and confirmation. No actual certificate is generated. |
| Return | Records a request for clarification or further evidence. Returned cases count as completed in this prototype; correction and resubmission are not implemented. |
| Reject | Lets the officer record rejection with a reason and confirmation. The rules do not automatically reject applications. |
| Required reason and confirmation | Require at least 12 characters and an explicit document-review checkbox before recording a decision. Repeat decisions on a completed record are blocked by the domain function. |
| Decision history | Shows completed cases with outcome, reason, officer name, and decision timestamp. It is a browser-local demonstration, not a secure audit log. |
| Export records | Downloads `arasu-demo-records.json`, containing all applications, decisions, and the fixed demo reference date. There is no import feature. |
| Reset demo | Asks for confirmation, clears recorded demo decisions, and restores the original 12 applications. |
| Review guide | Explains priority, evidence review, assistance limitations, and officer responsibility, with a link to official e-Sevai guidance. |
| Browser persistence | Keeps decisions after refresh in the same browser and origin. Records are not synchronised between browsers, ports, devices, or users. |
| Responsive interface | Provides desktop, tablet, and mobile layouts. Semantic controls, labelled inputs, native dialogs, visible focus styles, and live feedback support keyboard use. Browser and assistive-technology verification remain necessary. |

“Ready” means the demo checks found no missing evidence or income mismatch. It does not establish eligibility or replace officer review.

## Review rules and sample documents

`dist/domain.js` owns the dataset and review rules:

1. Check for missing documents in the five-item sample checklist.
2. Compare declared annual income with the evidence amount when income evidence is present.
3. Suggest returning for clarification if either check flags an issue.
4. Otherwise suggest considering approval after the officer verifies original evidence.
5. Require a valid action, a reason, officer confirmation, and a pending application before recording a decision.

The sample checklist contains:

- Applicant photo.
- Address proof.
- Family card.
- Self-declaration.
- Salary certificate or an invented sample income statement.

This is a simplified demonstration checklist, not a complete or authoritative statement of government requirements. The invented income statement does not establish that such a document is officially sufficient.

Official reference links are available for further checking:

- [Tamil Nadu e-Sevai service list](https://www.tnesevai.tn.gov.in/Pages/EsevaiServiceList.aspx).
- [Tamil Nadu e-Sevai FAQ and document guidance](https://tnesevai.tn.gov.in/Pages/FAQ.aspx).

Validate applicable departmental requirements before adapting the prototype for real use.

### Dates and counts

The reference date is fixed at **28 October 2026** so waiting times, ordering, and priority counts are reproducible. It does not advance with the device clock. Decision timestamps use the device's actual time and are displayed in English using the device's local timezone.

All 12 applications begin pending. Approved, returned, and rejected records count as completed and leave the pending queue.

## Technical structure

| File | Responsibility |
| --- | --- |
| `dist/index.html` | English page metadata, app mount point, decision dialog, and document dialog. |
| `dist/style.css` | Layout, responsive styles, controls, and system-font typography. |
| `dist/app.js` | Login, rendering, navigation, filters, search, dialogs, persistence, and JSON export. |
| `dist/domain.js` | Fictional records, waiting-time calculation, assessment rules, status labels, and decision validation. |
| `tests/domain.test.js` | Checks the sample dataset, review rules, and decision validation. |
| `tests/ui.test.js` | Uses a small fake DOM to check interaction wiring. |
| `package.json` | Defines the optional start and test commands. |
| `.openai/hosting.json` | Stores the registered Sites identity; it does not prove deployment. |

The app uses native JavaScript modules and browser APIs. There are no runtime package dependencies, external font downloads, API calls, or application backend. The official guidance link opens an external site when clicked.

### Storage behavior

- `localStorage`, key `arasu-demo-v1`, stores the fictional applications and recorded decisions when changes are saved.
- `sessionStorage`, key `arasu-demo-session`, stores the demo login state.
- Existing stored sample names and descriptions are refreshed into English when loaded. Saved decisions and officer-entered reasons are preserved; existing free-text reasons are not automatically translated.
- Resetting the demo restores the original dataset. Clearing browser site data also removes local records and login state.
- Storage is editable and local to the browser origin. It is unsuitable for protected citizen records or an official audit trail.

## Testing and verification

From the project root, with Node.js 18+ available:

```bash
npm test
```

Alternatively, with GNOME JavaScript installed:

```bash
gjs -m tests/domain.test.js
gjs -m tests/ui.test.js
```

The suite contains **21 domain assertions and 18 interaction assertions**. The interaction checks cover login, review rendering, document previews, decision confirmation, persistence, history, guide navigation, and logout.

The fake DOM does not verify visual layout, native browser validation, focus behavior, accessibility, or browser compatibility. Automated test results should not be presented as browser visual QA.

### Manual checks

- Try valid and invalid login credentials, then log out.
- Search by name, reference, and village; check every filter and an empty result.
- Open each detail tab and a sample document; close the dialog with its control and keyboard.
- Cancel a decision and check that the case remains pending.
- Try submitting without a sufficient reason or officer confirmation.
- Return a missing-evidence case, inspect history, and refresh to check persistence.
- Export the records and inspect the JSON, then reset the demo.
- Check desktop and narrow mobile layouts, text wrapping, keyboard navigation, and visible focus.

## Troubleshooting

| Issue | What to do |
| --- | --- |
| `python3: command not found` | Install Python 3. On Windows, `py -m http.server 4173 --bind 127.0.0.1 --directory dist` may be available instead. |
| Address already in use | Open the existing server if it is this app, or start on another port, such as `python3 -m http.server 4174 --bind 127.0.0.1 --directory dist`, then open `http://localhost:4174`. A different port has separate browser storage. |
| Browser cannot connect | Keep the server terminal open, check for startup errors, and use the matching port. If running remotely, forward that port through your development environment. |
| Blank page or module-loading error | Start the HTTP server from the project root and open its URL instead of opening the HTML file directly. Check the browser console for details. |
| Old wording is still visible | Refresh the page; if necessary, use a hard refresh to reload the JavaScript and styles. |
| Decisions do not persist | Allow browser storage and use the same browser, hostname, and port. Private browsing or clearing site data can remove records. |
| Node.js or npm is unavailable | Use Python directly to run the app. For tests, install Node.js or use the documented GJS alternative if already available. |

## Static hosting

The app can be served by a static host. Configure **no build command** and use **`dist` as the publish directory**. Alternatively, publish the contents of `dist` through a static-site deployment workflow.

Hosting this frontend does not add authentication, shared storage, or government integration. No live URL is documented as verified, and the registered Sites project still requires its supported source-sync and deployment workflow.

## Future development

A real pilot would require departmental validation of the checklist and workflow, usability testing with officers, server-side identity and roles, a shared transactional database, secure document storage, protected audit records, concurrent-review handling, and citizen correction and resubmission flows.

A future AI integration could produce evidence-linked summaries and findings, with evaluation and a deterministic fallback. Decisions should remain under officer control. Real citizen data should not be entered into this demonstration.
