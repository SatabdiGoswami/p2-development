import { test, expect } from "@playwright/test";
import { startVerified, field } from "./helpers.mjs";

test("map preview cannot start a session before Start", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#api")).toContainText("verified");
  await expect(page.locator("#board-art > svg")).toHaveCount(1);
  await expect(page.locator("#board-buttons button:disabled")).toHaveCount(9);
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#state dd")).toHaveCount(0);
  await expect(page.locator("#board")).toHaveAttribute("data-phase", "ready");
  await expect(page.locator("#board-launch")).toBeInViewport();
  await expect(page.locator("#board-launch svg")).toHaveCSS("color", "rgb(240, 214, 134)");
  await expect(page.locator("#board-launch svg")).toHaveCSS("width", "16px");
  await page.locator("#board-launch").click();
  await expect(page.locator("#board")).toHaveAttribute("data-phase", "playing");
});

test("map clicks share the rule path and update the artwork and counters", async ({ page }) => {
  await startVerified(page);
  await page.locator('#board-buttons [data-column="1"][data-row="0"]').click();
  await expect(page.locator("#moves-value")).toHaveText("5");
  await page.locator('#board-buttons [data-column="1"][data-row="1"]').click();
  await expect(page.locator("#result")).toHaveText("Rejected: WALL");
  await expect(page.locator("#moves-value")).toHaveText("5");
  await page.locator('#board-buttons [data-column="2"][data-row="0"]').click();
  await expect(page.locator("#score-value")).toHaveText("10");
  await expect(page.locator("#treasure-value")).toHaveText("1 / 1");
  await expect(page.locator(".board-relic")).toHaveCSS("opacity", "0");
  await expect(page.locator("#explorer")).toHaveCSS("transform", "matrix(1, 0, 0, 1, 304, 0)");
  await expect(page.locator("#gate")).toHaveClass("unlocked");
  await expect(page.locator("#telemetry")).toHaveText("Recorded locally");
  const runId = await page.locator("#run-id").textContent();
  const response = await page.request.get(`/api/events?runId=${runId}`);
  const { events } = await response.json();
  expect(events.map(event => [event.sequence, event.action, event.accepted])).toEqual([[1, "east", true], [2, "south", false], [3, "east", true]]);
  expect(events[1].before).toEqual(events[1].after);
});

test("keyboard completes the last-move win and cannot move afterward", async ({ page }) => {
  await startVerified(page);
  for (const key of ["ArrowRight", "d", "a", "ArrowRight", "s", "ArrowDown"]) await page.keyboard.press(key);
  await expect(page.locator("#board")).toHaveAttribute("data-phase", "won");
  await expect(page.locator("#moves-value")).toHaveText("0");
  await expect(page.locator("#banner-text")).toHaveText("Expedition complete");
  await expect(page.locator("#board-buttons button:disabled")).toHaveCount(9);
  await expect(page.locator("#move-pips .spent")).toHaveCount(6);
  await page.keyboard.press("ArrowLeft");
  await expect(field(page, "position")).toHaveText("(2,2)");
});

test("loss and restart reset all graphical progress", async ({ page }) => {
  await startVerified(page);
  for (const key of ["d", "a", "d", "a", "d", "a"]) await page.keyboard.press(key);
  await expect(page.locator("#board")).toHaveAttribute("data-phase", "lost");
  await expect(page.locator("#banner-text")).toHaveText("Out of moves");
  await page.getByRole("button", { name: "Play again", exact: true }).click();
  await expect(page.locator("#board")).toHaveAttribute("data-phase", "playing");
  await expect(page.locator("#moves-value")).toHaveText("6");
  await expect(page.locator("#score-value")).toHaveText("0");
  await expect(page.locator("#board-banner")).toBeHidden();
  await expect(page.locator(".board-relic")).toHaveCSS("opacity", "1");
  await expect(page.locator("#move-pips .spent")).toHaveCount(0);
});

for (const width of [1280, 390, 320]) {
  test(`board and controls fit at ${width}px with reduced motion`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await startVerified(page);
    const board = await page.locator("#board").boundingBox();
    expect(Math.abs(board.width - board.height)).toBeLessThan(1);
    expect(board.width).toBeGreaterThan(250);
    const overflow = await page.evaluate(() => [...document.querySelectorAll("h1,h2,button,.metric-heading,.action-result,.quest-steps")]
      .filter(element => element.getClientRects().length && (element.scrollWidth > element.clientWidth + 1 || element.getBoundingClientRect().right > innerWidth + 1))
      .map(element => element.textContent));
    expect(overflow).toEqual([]);
    await expect(page.locator("#explorer")).toHaveCSS("transition-duration", "0s");
    await page.locator('#board-buttons [data-column="1"][data-row="0"]').click();
    await expect(page.locator("#moves-value")).toHaveText("5");
  });
}