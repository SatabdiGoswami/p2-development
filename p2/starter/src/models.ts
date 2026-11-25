// OWNED BY YOU. Precise state and action types, and the invariants they must keep.
//
// These are deliberately EMPTY, compilable shapes so the page can boot before you start.
// Replace them with precise types for your chosen route (see GAME-CONTRACT.md), for example
// field names, literal unions for the permitted actions and statuses, and readonly fields.
// Write each invariant as a comment beside the field it protects.

/** The game state your rules return and the page paints. TODO: name every field. */
export interface GameState {}

/** One permitted player action. TODO: narrow `type` (and any other field) to the permitted values. */
export interface GameAction {
  readonly type: string;
}

/** The result envelope every evaluate() call returns: { accepted, reason, state }. */
export interface RuleResult {
  readonly accepted: boolean;
  readonly reason: string | null;
  readonly state: GameState;
}
