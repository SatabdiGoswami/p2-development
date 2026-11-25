import { loadConfig } from "./api.js";
import { GENRE } from "./genre.js";
import type { GameAction, GameState } from "./models.js";
import { evaluate, initialState, isFinished } from "./rules.js";
import type { TreasureConfig } from "./supplied/config.js";
import { connect, playable } from "./supplied/controls.js";
import { identify, paint, text } from "./supplied/render.js";
import { newRunId, recordEvent } from "./supplied/telemetry.js";

let config: TreasureConfig | null = null;
let state: GameState | null = null;
let runId = "";
let sequence = 0;
let loadVersion = 0;

function render(): void {
  if (!state) return;
  paint(state);
  playable(!isFinished(state));
  text("status", state.status === "won" ? "You won!" : state.status === "lost" ? "Game over: no moves remaining." : "Playing");
}

function start(): void {
  if (!config) return;
  state = initialState(config);
  runId = newRunId();
  sequence = 0;
  identify(runId);
  text("result", "");
  text("telemetry", "");
  render();
}

async function reload(): Promise<void> {
  const requestVersion = ++loadVersion;
  text("api", "Loading game data...");
  try {
    const verified = await loadConfig();
    if (requestVersion !== loadVersion) return;
    config = verified;
    text("api", "Reference API verified");
  } catch (error) {
    if (requestVersion !== loadVersion) return;
    text("api", error instanceof Error ? error.message : "Game data unavailable");
  }
}

function dispatch(action: GameAction): void {
  if (!config || !state) return;
  const before = structuredClone(state);
  const result = evaluate(config, state, action);
  state = result.state;
  render();
  text("result", result.accepted ? `Moved ${action.direction}` : `Rejected: ${result.reason}`);

  const eventRun = runId;
  const eventSequence = ++sequence;
  text("telemetry", "Recording locally...");
  const report = (message: string): void => {
    if (eventRun === runId && eventSequence === sequence) text("telemetry", message);
  };
  void recordEvent({
    runId: eventRun,
    sequence: eventSequence,
    action: action.direction,
    accepted: result.accepted,
    before,
    after: structuredClone(state),
  }).then(() => report("Recorded locally"), () => report("Local recording unavailable"));
}

connect(GENRE, { dispatch, start, restart: start, reload: () => { void reload(); } });
playable(false);
text("status", "Ready to start");
void reload();
