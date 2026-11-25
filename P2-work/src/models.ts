import type { Point } from "./supplied/config.js";

export type Direction = "north" | "east" | "south" | "west";
export type GameStatus = "playing" | "won" | "lost";
export type RejectionReason = "INVALID_ACTION" | "GAME_COMPLETE" | "EDGE" | "WALL";

export interface GameState {
  /** Always inside the board and never on a wall. */
  readonly position: Point;
  /** Non-negative; only an accepted move spends one. */
  readonly movesRemaining: number;
  /** Sum of the values of uniquely collected treasures. */
  readonly score: number;
  /** Each collected treasure ID appears at most once. */
  readonly collected: readonly string[];
  readonly status: GameStatus;
}

export interface GameAction {
  readonly type: "move";
  readonly direction: Direction;
}

/** The result envelope every evaluate() call returns: { accepted, reason, state }. */
export interface RuleResult {
  readonly accepted: boolean;
  readonly reason: RejectionReason | null;
  readonly state: GameState;
}
