# P2 Development: Treasure Hunt

Project 2 submission: a playable TypeScript treasure-hunt game with deterministic rules, browser
controls, validated game-data loading, local event recording and a verified local release.
The working source now includes **Treasure Trail**, an illustrated board with an animated explorer,
clickable tiles, keyboard/direction-pad controls and visual progress. The retained `playable-01` artifact
is the earlier text-only version, not the updated frontend.

## Submission Contents

- [Implementation and run instructions](P2-work/README.md): completed source and tests.
- [Evidence and assistance record](P2-work/evidence.md): actual observations, saved event and remaining learner demonstrations.
- [Verification artifacts](P2-work/verification/): desktop screenshots and the pre-implementation failing-test log.
- [Release inventory](releases/playable-01/release.json): the retained 47-file local release.
- [P2 requirements](p2/README.md) and [learner manual](p2/P2-Learner-Manual.docx): supplied project materials; the original starter is preserved under `p2/starter`.

## Run and Check

From the repository root, with Node 22 or newer and npm installed:

```powershell
cd P2-work
npm ci
npx playwright install chromium
npm test
npm start
```

Open <http://127.0.0.1:4182/> after starting. The test suite starts its own temporary server, so stop
an existing server on that port first or select a free port using `$env:PORT="4184"`.
Local URLs in the evidence refer to the original verification session, not a public website.

Verified : 15 rule tests passed, six unselected range fixtures skipped,
and all 17 browser checks passed against graphical source. The retained release passed the ten original
browser checks before the frontend update. Desktop play and restart were checked at widths
1280, 390 and 320. The current graphical preview is <http://127.0.0.1:4184/>.

To verify and run the release, from `P2-work` with Python and Node installed:

```powershell
python tools/release.py verify ../releases/playable-01
python ../releases/playable-01/serve.py
```

The artifact is intentionally committed, including compiled JavaScript. Its bytes are preserved by
Git attributes so the SHA-256 inventory remains valid across platforms. Dependencies, temporary
build output and Playwright scratch reports are not committed. This is a local release, not a cloud deployment.

