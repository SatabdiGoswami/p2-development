// OWNED BY YOU. The application adapter: load -> start -> dispatch -> restart.
//
// Supplied boundary you call:
//   connect(GENRE, { dispatch, start, restart, reload })   once, at startup (src/supplied/controls.ts)
//   playable(enabled)                                      enable/disable the action buttons
//   paint(state)                                           show the state you choose (src/supplied/render.ts)
//   text(region, message)                                  "api" | "status" | "result" | "telemetry"
//   identify(runId)                                        show the run ID and point the event link at it
//   newRunId(), recordEvent(event)                         event helper (src/supplied/telemetry.ts)
//
// STARTER: the page boots and every button reports that it is not connected yet.
// Replace this with retained state, the rule call, painting and the event call.

import { GENRE } from "./genre.js";
import { connect, playable } from "./supplied/controls.js";
import { text } from "./supplied/render.js";

const notYet = (what: string) => () => text("status", `${what} is not implemented yet: see src/app.ts`);

connect(GENRE, {
  dispatch: (action) => text("result", `Received "${action.type}"; dispatch is not implemented yet (src/app.ts)`),
  start: notYet("Start"),
  restart: notYet("Restart"),
  reload: notYet("Reload"),
});

playable(true);
text("api", "Game data request not implemented yet (src/api.ts)");
text("status", "Page booted. Implement src/models.ts, src/rules.ts, src/api.ts and src/app.ts.");
