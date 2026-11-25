// OWNED BY YOU. Your changed-input regression with an INDEPENDENT expected value.
//
// Choose an input the contract fixtures do not already cover (a changed invalid or completion input
// from your brief), work out the expected result by hand from the rules BEFORE running it, and assert
// the whole result: accepted, reason and every state field. Also check the input was not mutated.
// Keep the test that failed before your repair; do not weaken it to get a green result.
//
// Run with: npm run check:rules   (it builds first, then imports the compiled rules from dist/)

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { initialState, evaluate, isFinished } from "../dist/rules.js";
import { parseConfig } from "../dist/supplied/config.js";

const config = parseConfig("treasure", JSON.parse(readFileSync(new URL("../fixtures/board-reference.json", import.meta.url), "utf8")));

test("AI-assisted regression: revisiting collected treasure does not score twice", () => {
  const before = Object.freeze({
    position: Object.freeze({ x: 1, y: 0 }),
    movesRemaining: 3,
    score: 10,
    collected: Object.freeze(["t1"]),
    status: "playing",
  });
  const snapshot = structuredClone(before);
  const action = Object.freeze({ type: "move", direction: "east" });
  assert.deepStrictEqual(evaluate(config, before, action), {
    accepted: true,
    reason: null,
    state: { position: { x: 2, y: 0 }, movesRemaining: 2, score: 10, collected: ["t1"], status: "playing" },
  });
  assert.deepStrictEqual(before, snapshot);
});

test("AI-assisted regression: public start retains treasure and wins on the sixth move", () => {
  let state = initialState(config);
  for (const direction of ["east", "east", "west", "east", "south", "south"]) {
    const result = evaluate(config, state, { type: "move", direction });
    assert.equal(result.accepted, true);
    state = result.state;
  }
  assert.deepStrictEqual(state, {
    position: { x: 2, y: 2 }, movesRemaining: 0, score: 10, collected: ["t1"], status: "won",
  });
  assert.equal(isFinished(state), true);
  assert.deepStrictEqual(initialState(config), {
    position: { x: 0, y: 0 }, movesRemaining: 6, score: 0, collected: [], status: "playing",
  });
});
