# Project 2 evidence: playable TypeScript game

Owned by you. Write, speak, annotate or record each response; a pair shares the artifact but gives two
individual responses. Record observations you actually made, not what you expected to see.

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
