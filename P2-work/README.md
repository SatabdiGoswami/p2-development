# P2: Treasure Trail

AI-assisted implementation of the P2 treasure route, locally verified on 2026-11-25.
The software is playable; this does not complete the course's independent learner-evidence requirements.
See [evidence.md](evidence.md) for actual results, assistance and remaining learner demonstrations.

## Play

The graphical source preview currently runs at <http://127.0.0.1:4184/>.
Choose the play icon on the map or **Start game**, then click adjacent tiles, use the direction pad,
or press arrow keys / WASD. Collect t1 and reach the exit before
the six-move budget runs out. East, East, South, South wins with ten points and two moves left.
Invalid moves cost nothing; treasure scores only once. **Restart** creates a fresh game and run ID.
The **Field log** link filters action records to the displayed run ID.
The illustrated map animates the explorer, removes collected treasure, unlocks the gate and shows
win/loss feedback with a replay button. Reduced-motion preferences are respected.
The older text-only release remains separate at <http://127.0.0.1:4183/>.

## Run From Source

Run these commands inside `P2-work`. Requirements: Node 22 or newer and npm; Python is needed only
for the supplied release tools. Tested locally with Node 26.11.1 and npm 11.20.0, which differ from
the course pins of Node 22.23.2 and npm 10.9.8.

```powershell
npm ci
npx playwright install chromium
npm start
```

The default source URL is <http://127.0.0.1:4182/>. Stop an existing process on that port first, or
set `$env:PORT="4184"` before starting. Stop the current preview before reusing that port.
Changes to TypeScript require `npm run build` and a browser reload; the supplied server is not a watcher.
The build typechecks with TypeScript and bundles Lucide icons with esbuild. Game artwork is inline SVG;
the frontend needs no external image or icon requests. No API keys or cloud credentials are required.

## Test

Use a free temporary port while development and release previews are running:

```powershell
$env:PORT="4185"
npm test
Remove-Item Env:PORT
```

Verified result: 15 rule/regression tests passed, six unselected range fixtures skipped, and all
17 browser checks passed (ten supplied plus seven graphical checks).
The graphical checks cover map/keyboard input, counters/artwork, completion/replay, viewport fit and reduced motion.
Two regression tests in [tests/learner.test.mjs](tests/learner.test.mjs)
are explicitly AI-assisted, not learner-authored predictions. The supplied fixture assertions remain unchanged.

## Retained Release

The immutable, text-only artifact is [playable-01](../releases/playable-01/release.json): compiled JavaScript,
supplied API and game data, with a 47-file SHA-256 inventory. From `P2-work`:

```powershell
python tools/release.py verify ../releases/playable-01
$env:PORT="4183"
python ../releases/playable-01/serve.py
```

Stop any existing process on port 4183 first. In another terminal in `P2-work`, test that running artifact:

```powershell
$env:P2_URL="http://127.0.0.1:4183"
npm run check:browser -- events.spec.mjs lifecycle.spec.mjs request-failure.spec.mjs
Remove-Item Env:P2_URL
python tools/release.py verify ../releases/playable-01
```

All ten original browser checks passed against the artifact. New graphical checks apply to source only;
the graphical frontend has not been packaged into a new retained release. The game-data response identifies the old artifact with
`X-Lab-Release: playable-01`. For later changes, run the full quality gate and pack a new release name;
do not modify the retained artifact. This is a local release, not a cloud or Kubernetes deployment.

## Evidence and Handover

- [Evidence record](evidence.md): baseline, checks, type diagnostic, real event row and remaining learner work.
- Graphical screenshots: [desktop](verification/frontend-desktop.png), [short desktop](verification/frontend-short-desktop.png), [mobile](verification/frontend-mobile.png), [narrow mobile](verification/frontend-narrow.png).
- Original text-only screenshots remain at [desktop](verification/desktop-win.png) and [mobile](verification/mobile-win.png).
- Responsive play/restart verified at widths 1280, 390 and 320, without text overflow or browser page errors.
- Event rows are held in server memory only. Preserve relevant rows before stopping the process with Ctrl+C.
- P1, original P2 starter, W2.10 materials, supplied helpers, rules and retained release were left unchanged by the frontend update. The working copy's presentation and controller integration were updated.