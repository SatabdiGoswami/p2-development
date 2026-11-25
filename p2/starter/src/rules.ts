// OWNED BY YOU. Pure rules: no DOM, clock, randomness or I/O, and never mutate an input.
//
//   initialState(config)                 -> a fresh state for the validated configuration
//   evaluate(config, state, action)      -> { accepted, reason, state }   (see GAME-CONTRACT.md)
//
// The starter deliberately has NO rule implementation, so `npm run check:rules` is red until you
// write these two functions. Narrow the `config` parameter to TreasureConfig or RangeConfig once
// you have chosen your route in src/genre.ts.

import type { RangeConfig, TreasureConfig } from "./supplied/config.js";
import type { GameAction, GameState, RuleResult } from "./models.js";

export function initialState(config: TreasureConfig | RangeConfig): GameState {
  throw new Error(`initialState is not implemented yet (src/rules.ts); received config "${config.id}"`);
}

export function evaluate(config: TreasureConfig | RangeConfig, state: GameState, action: GameAction): RuleResult {
  throw new Error(`evaluate is not implemented yet (src/rules.ts); received action "${action.type}"`);
}

/** True when no further action can be accepted (used by your app to disable the action buttons). */
export function isFinished(state: GameState): boolean {
  throw new Error("isFinished is not implemented yet (src/rules.ts)");
}
