# Project 2 evidence: playable TypeScript game

Owned by you. Write, speak, annotate or record each response; a pair shares the artifact but gives two
individual responses. Record observations you actually made, not what you expected to see.

## Local setup baseline (assistant-run, 2026-11-25)

- Working copy: `P2-work`, copied from `p2/starter`; P1 and the supplied P2 starter were left unchanged.
- Route: supplied `treasure` default retained for setup; learner's W2.10 brief and route confirmation are pending.
- Environment: Windows, Node `v26.11.1`, npm `11.20.0`. These differ from the course pins (Node `22.23.2`, npm `10.9.8`).
- `npm ci`: installed four packages; audit reported zero vulnerabilities.
- `npm run check:boot`: passed, including TypeScript build, page/assets, game-data routes, health, collector validation and configuration guard.
- Initial `npm run check:rules`: TypeScript build passed; 20 tests, 0 pass, 14 fail, 6 skipped, 0 cancelled, 0 todo. Exit code 1 is the expected starter baseline.
- Failure boundaries: unimplemented `initialState`/`evaluate` in `src/rules.ts` and the placeholder learner regression. Range fixtures are skipped because the route is `treasure`.
- At this initial baseline, no learner-owned application or test source had been changed; playable lifecycle, browser acceptance, event observation and release were not yet demonstrated.
- Assistance: GitHub Copilot performed setup and baseline checks. These observations are not independent learner evidence; the response sections below remain for the learner.

## AI-assisted implementation and verification (2026-11-25)

The user confirmed treasure hunt and requested completion. GitHub Copilot generated the models,
rules, API adapter, application controller and two regression tests, then ran the checks below.
This is an AI-assisted reference implementation, not an independent first/core attempt. The course
README and learner manuals reserve those attempts and individual responses for learner work without
generated answers. Software completion does not establish completion of those course requirements.

### Scope and sources

- Used `../p2/README.md`, `../p2/P2-Learner-Manual.docx`, `../w2-10/w2-10/README.md`, the W2.10 learner manual and the unchanged supplied P2 fixtures/helpers.
- The W2.10 brief template and acceptance witnesses in this workspace were blank; no completed personal brief or plan comparison is claimed.
- Implemented the reference 3x3 treasure hunt with six moves, wall (1,1), treasure t1 (2,0), exit (2,2), and ten points per unique treasure.
- `src/models.ts`: readonly state, four permitted directions, three statuses and named rejection reasons. Invariants are documented beside fields.
- `src/rules.ts`: pure initial state, runtime action validation, unchanged rejections, unique collection, win-before-zero-budget-loss ordering and completion detection.
- `src/api.ts`: same-origin request, HTTP/network/malformed JSON errors and supplied configuration validation.
- `src/app.ts`: retains the full returned state including collected IDs; starts/restarts with a new run ID; preserves a confirmed session on failed reload; ignores stale load/event UI results; records actions without undoing them on collector failure.
- No changes to P1, the original P2 starter, W2.10 materials, supplied fixture expectations, controls, renderer, configuration guard, transport helper, server or presentation.

### Actual checks

| Check | Observed result |
|---|---|
| Initial scaffold | 0 passed, 14 failed, 6 skipped; build passed |
| New regressions before rule implementation | 0 passed, 15 failed, 6 skipped; both new tests failed in the unimplemented rule functions |
| Rules after implementation | 15 passed, 0 failed, 6 skipped; includes 13 unchanged treasure fixtures and two AI-assisted regressions |
| First browser attempt | Setup failure: missing Playwright Chromium executable; installed Chromium 149.0.7827.55 using the pinned Playwright 1.61.0 |
| Supplied browser suite after installation | 10 passed |
| Complete `npm test` gate, temporary port 4183 | Rules: 15 passed, 0 failed, 6 skipped; browser: 10 passed |
| Browser suite against packed release, `P2_URL=http://127.0.0.1:4183` | 10 passed; no second test server |
| Responsive public-start win/restart | Passed at widths 1280, 390 and 320; no horizontal/text overflow or page errors |
| Editor diagnostics for changed application/test files | No errors |
| Release integrity before and after browser verification | 47 files match the SHA-256 inventory |

The six skipped cases belong to the unselected range route. Screenshots from standalone Chromium:
[desktop](verification/desktop-win.png) and [mobile](verification/mobile-win.png).
Integrated-browser full-page captures had inconsistent geometry and were replaced by these verified captures.

### Type constraint and regression observations

A virtual TypeScript source imported `GameAction` and attempted `{ type: "move", direction: "up" }`.
The real compiler returned `TS2322: Type '"up"' is not assignable to type 'Direction'.`
The virtual source was discarded; application source was never made invalid. This is an assistant-run
type check, not the learner's required edit/diagnostic/restore demonstration.

The first new regression starts at (1,0), with three moves, score ten and collected `["t1"]`, then
moves East. Its literal expectation is accepted, reason null, position (2,0), two moves, score ten,
collected `["t1"]`, status playing. Nested input objects are frozen and compared with an untouched copy.
The second follows East, East, West, East, South, South from public initial state and expects a win
at (2,2) with zero moves, score ten and t1 retained. A new initial state is checked afterward.
Both expectations were added before implementation and passed afterward without weakening assertions.

These are implementation red/green checks, not evidence of an independently diagnosed game defect.
No facilitator-supplied diagnostic variant was provided or run. The learner debugging exercise remains pending.

### Browser and API observations

- Public Start, East, East, South, South: position (2,2), movesRemaining 2, score 10, collected t1, status won; all four movement buttons disabled.
- Restart: fresh state, six moves and a new run ID; controls enabled. Supplied checks confirm event sequence restarts at one.
- North from start: EDGE. East then South: WALL, with position (1,0), five moves and score zero unchanged.
- Supplied interception checks observed pending `Loading`, success `verified`, HTTP 503, malformed JSON and unexpected-definition failures. Failed initial requests did not start a game.
- Failed reload after East retained position (1,0), five moves and playing status; action controls stayed enabled. HTTP errors remained in the API region.
- Collector HTTP 503 displayed `Local recording unavailable`; the accepted game action remained applied.

### Retained actual release event

Opened the event view filtered to `run-e19dd9e4`; four rows were visible for that run.
The following final row matched the game's winning state:

```json
{
	"receivedAt": "2026-11-25T04:30:10.611Z",
	"runId": "run-e19dd9e4",
	"sequence": 4,
	"action": "south",
	"accepted": true,
	"before": { "position": { "x": 2, "y": 1 }, "movesRemaining": 3, "score": 10, "collected": ["t1"], "status": "playing" },
	"after": { "position": { "x": 2, "y": 2 }, "movesRemaining": 2, "score": 10, "collected": ["t1"], "status": "won" }
}
```

This is a transcription of the displayed row. The collector stores events only in process memory;
the record above survives server teardown. It is local telemetry, not Grafana or BP telemetry.
Screenshots were captured in separate subsequent runs.

### Local release

- Source: `P2-work/src` plus unchanged supplied assets/server and tests.
- Artifact: `../releases/playable-01`, with [release.json](../releases/playable-01/release.json).
- Process: the artifact's `serve.py` launches its own Node host; local URL `http://127.0.0.1:4183/`.
- Pack output: `Packed release playable-01 (treasure): 47 files`.
- Verify output: `Release playable-01 verified: 47 files match release.json (SHA-256)`.
- Actual game-data GET: HTTP 200, board `reference`, response header `X-Lab-Release: playable-01`.
- Development preview remains separate at port 4182. No cloud, container, Kubernetes, BP or GitHub submission is claimed for P2.

## AI-assisted graphical frontend update (2026-11-25)

The user requested a playable-looking frontend after the original submission. These changes are in
the Git checkout's `P2-work`, not the separate original workspace copy. Earlier results above describe
the original text-only implementation and retained release; they have not been replaced or reinterpreted.

- Added Treasure Trail / Mosswood Ruins: custom inline SVG board, explorer, relic, ruins and exit, with Lucide controls, visible counters and objective progress.
- Added adjacent-tile input and arrow/WASD keys through the existing controller/rules/event path. The pure rules, supplied helpers, server and fixtures remain unchanged.
- Start on the map is disabled until verified data arrives; completion disables movement and offers replay. Keyboard input is ignored before start and after completion.
- Updated the source HTML/CSS and bundled the browser entrypoint with esbuild. Artwork/icons are self-contained, with no runtime CDN dependency.
- Initial new graphical suite: seven passed. A later in-viewport assertion exposed a start control below the fold at 720px desktop height; a height-constrained layout corrected it. A screenshot exposed a missing Lucide CSS class; adding the hook restored intended sizing and contrast, with explicit browser assertions.
- Full `npm test` using `P2_URL=http://127.0.0.1:4184`: 15 rule/regression tests passed, six range cases skipped, 17 browser tests passed. The seven new checks are AI-authored, not learner predictions.
- Responsive checks: 1280, 390 and 320px widths, reduced-motion transitions disabled, no horizontal/text overflow. Standalone Chromium captures also checked 1280x720 and verified the map's start button was initially inside every viewport. No browser page errors were observed.
- Screenshots: [desktop](verification/frontend-desktop.png), [short desktop](verification/frontend-short-desktop.png), [mobile](verification/frontend-mobile.png), [narrow mobile](verification/frontend-narrow.png). Original screenshots remain unchanged.
- Graphical source process: <http://127.0.0.1:4184/>. `playable-01` and its inventory remain untouched and text-only; no new release or frontend commit/push is claimed here.

This work is AI-assisted implementation and verification, not completion of the learner's personal evidence.

### Remaining learner requirements

Personal W2.10 brief/plan reasoning, independent predictions and bounded changes, compiler demonstration,
debugging exercise, peer review, individual explanation and reflection are not yet demonstrated.
No learner identity, review, timing record, grade or independent competence has been invented.
The sections below are intentionally retained for the learner's own responses and facilitator review.

Learner id (synthetic, e.g. `learner-01`): ______  Pair/team id (e.g. `p2-team-a`): ______
Genre route chosen in `src/genre.ts` (`treasure` / `range`) and the game identity kept from your brief:

## 1. Plan check (Thursday PM, minute 0-20)
- Brief, minimum slice and acceptance examples brought from W2.10:
- The seven outcomes and which owned file delivers each:

## 2. Typed models (acceptance 1)
- Field names, permitted actions and one invariant (quote `src/models.ts`):
- Incompatible value you tried, the compiler diagnostic (code + message), and the restored valid source:

## 3. Core logic (acceptance 2)
- `npm run check:rules` result (first red run, then green): paste the pass/fail/skipped lines.
- Your changed-input regression: before-state, action, expected result worked out by hand **before** running:
- Evidence that inputs are unchanged and invalid/completed actions are rejected:

## 4. Checkpoints
- Minute 120: start / accepted / rejected checks you can show:
- Minute 180: one browser action rendered from returned state; the remaining handoff:
- Minute 270 (midpoint, about 60%): what is complete, what remains, support requested:

## 5. Browser lifecycle (acceptance 3)
- Public start -> progress -> finish -> fresh restart: steps and what the page showed at each:

## 6. API loading and failure (acceptance 4)
- Loading observed before response (how):
- Success message:
- HTTP failure / malformed JSON / unexpected definition: message shown for each, and the command or check used:
- Failed reload kept the last confirmed session (state before and after):

## 7. Debugging (acceptance 5)
- Reproducible failing behaviour (input and observed result):
- Responsible boundary and the narrow correction:
- Same regression failing before / passing after (paste both runs):
- Diagnostic variant requested? (yes/no; when; in which preserved copy):

## 8. Event (acceptance 6)
- Displayed run ID, sequence, action, acceptance:
- Saved event-view row (paste the row text before stopping the collector):
- Comparison of the row's before/after with the page:

## 9. Release (acceptance 7)
- `npm test` result:
- Release name, `pack` and `verify` output, `release.json` retained at:
- `P2_URL=http://127.0.0.1:4182 npm run check:browser` result against the running release:
- Source vs artifact vs process: what each was in your run, and the accurate scope label (local only):

## 10. Individual responses
- Changed invalid or completion input: prediction from the brief, execution, actual result:
- Public-start trace and one bounded change you made yourself:

## 11. Assistance and status
- Supplied examples/hints/checkpoints reused (name them):
- Status per outcome: demonstrated independently / demonstrated with a prompt / completed with guided support / not yet demonstrated
- Environment blocked (separately, with what was blocked):
- Next in-class revisit:
