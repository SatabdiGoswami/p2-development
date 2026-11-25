import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft, Compass, Map, BookOpen, Footprints, Gem, PackageOpen, Keyboard, Play, RotateCcw, DoorOpen, Check, Radio, RefreshCw, ChevronDown, createElement, type IconNode } from "lucide";
import type { Direction, GameState } from "./models.js";
import type { TreasureConfig } from "./supplied/config.js";

const icons: Record<string, IconNode> = { compass: Compass, map: Map, book: BookOpen, footprints: Footprints, gem: Gem, chest: PackageOpen, keyboard: Keyboard, play: Play, restart: RotateCcw, door: DoorOpen, check: Check, radio: Radio, refresh: RefreshCw, chevron: ChevronDown };
const arrows: Record<Direction, IconNode> = { north: ArrowUp, east: ArrowRight, south: ArrowDown, west: ArrowLeft };
const keys: Record<string, Direction> = { ArrowUp: "north", ArrowRight: "east", ArrowDown: "south", ArrowLeft: "west", w: "north", d: "east", s: "south", a: "west" };
let move: (direction: Direction) => void;
let tiles: HTMLButtonElement[] = [];

function element(id: string): HTMLElement {
  const found = document.getElementById(id);
  if (!found) throw new Error(`Missing board element: ${id}`);
  return found;
}

function icon(node: IconNode): SVGElement {
  const svg = createElement(node);
  svg.classList.add("lucide");
  svg.setAttribute("aria-hidden", "true");
  return svg;
}

export function connectBoard(onMove: (direction: Direction) => void, canMove: () => boolean): void {
  move = onMove;
  for (const target of document.querySelectorAll<HTMLElement>("[data-icon]")) {
    const node = icons[target.dataset.icon ?? ""];
    if (node) target.replaceChildren(icon(node));
  }
  for (const button of document.querySelectorAll<HTMLButtonElement>("#actions button")) {
    const direction = button.dataset.action as Direction;
    button.setAttribute("aria-label", button.textContent ?? direction);
    button.title = button.textContent ?? direction;
    button.replaceChildren(icon(arrows[direction]));
  }
  const center = document.createElement("span");
  center.className = "dpad-center";
  center.setAttribute("aria-hidden", "true");
  center.append(icon(Compass));
  element("actions").append(center);
  element("board-launch").addEventListener("click", () => {
    element(element("board").dataset.phase === "ready" ? "start" : "restart").click();
  });
  document.addEventListener("keydown", event => {
    if (!canMove() || event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
    if (event.target instanceof HTMLElement && event.target.closest("input,textarea,select,[contenteditable=true]")) return;
    const direction = keys[event.key] ?? keys[event.key.toLowerCase()];
    if (!direction) return;
    event.preventDefault();
    move(direction);
  });
}

const artwork = `<defs>
  <pattern id="earth" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M4 12h3m15 14h2" stroke="#89a783" stroke-width="2" opacity=".22"/></pattern>
  <symbol id="fern" viewBox="0 0 80 90"><path d="M40 86Q35 48 44 10" fill="none" stroke="#396b4b" stroke-width="3"/><path d="M41 65Q7 67 8 40Q33 40 41 65M40 51Q12 43 18 23Q37 25 40 51M42 36Q29 20 40 3Q54 17 42 36" fill="#639262"/><path d="M41 72Q74 67 72 42Q48 46 41 72M41 51Q70 44 66 21Q47 27 41 51" fill="#417a51"/></symbol>
  <symbol id="ruin" viewBox="0 0 130 130"><ellipse cx="65" cy="113" rx="57" ry="12" fill="#264d37" opacity=".14"/><path d="M15 97V36l21-12h66l17 16v64l-18 13H29Z" fill="#6e8178"/><path d="M14 36h40v32H14zm43-12h45v40H57zm-28 47h47v37H29zm50-3h40v36H79" fill="#a2aea0" stroke="#66796d" stroke-width="3" stroke-linejoin="round"/><path d="M14 36l22-12h66l17 16-40-4-22-12-3 12Z" fill="#c2cbbb"/><path d="M15 79l18-9 12 5 9-3 11 12-7 9H28l-14 8m70-78 10 9 9-2 14 14V28Z" fill="#5d8953"/><path d="M29 47h14m28-10h14m4 45h15" stroke="#d7dfcf" stroke-width="3" stroke-linecap="round"/><path d="M60 67l-5 13 6 7-5 15" stroke="#596d60" stroke-width="2" fill="none"/></symbol>
  <symbol id="relic-art" viewBox="0 0 100 100"><ellipse cx="50" cy="84" rx="34" ry="8" fill="#4d6139" opacity=".18"/><path d="M18 47h64v32l-8 8H25l-7-8Z" fill="#bf8b31" stroke="#785e2d" stroke-width="3"/><path d="M18 47q0-25 16-25h32q16 0 16 25v9H18Z" fill="#e4b647" stroke="#785e2d" stroke-width="3"/><path d="M28 27v55m44-55v55M18 55h64" stroke="#ffe298" stroke-width="7"/><path d="M43 47h14v20H43Z" fill="#ffe8a2" stroke="#785e2d" stroke-width="2"/><path d="M49 54h3v7h-3Z" fill="#785e2d"/><path d="m49 2 4 7 8 2-8 3-4 7-3-7-8-3 8-2Z" fill="#f7d061"/></symbol>
  <symbol id="gate-art" viewBox="0 0 130 140"><ellipse cx="65" cy="126" rx="52" ry="9" fill="#365443" opacity=".16"/><path d="M24 118V51Q24 9 65 9t41 42v67H84V54Q84 32 65 32T46 54v64Z" fill="#9cafa2" stroke="#607b6b" stroke-width="3"/><path d="M47 117V54q0-21 18-21t18 21v63" class="portal" fill="#345c4b"/><path d="M20 117h90v10H20Z" fill="#b5c3b2" stroke="#6f8676" stroke-width="2"/><path d="M26 54h20m39 0h19M25 87h20m40 0h20M48 15l8 20m25-21-8 21" stroke="#607b6b" stroke-width="3"/><path d="m65 3 10 10-10 10-10-10Z" class="gate-gem" fill="#d1dbc8" stroke="#607b6b" stroke-width="2"/><path d="M15 101q-5-19 6-22 11 12 0 23m85-62q16-8 19 4-10 9-19 0" fill="#5b895b"/></symbol>
  <symbol id="explorer-art" viewBox="0 0 80 105"><ellipse cx="40" cy="95" rx="24" ry="7" fill="#224330" opacity=".23"/><path d="M22 54q-10 1-10 16v15h12Z" fill="#ab6c4e" stroke="#654c39" stroke-width="2"/><path d="M29 77l-2 15h13l2-15m4 0 1 15h13l-5-18" fill="#334f47"/><path d="M25 91h16v7H23zm21 0h16v7H46Z" fill="#273c35"/><path d="M25 49q14-9 30 0l7 28q-20 10-41 0Z" fill="#d46c55" stroke="#844d3f" stroke-width="2"/><path d="M21 57l-7 20 7 4 9-21m25-4 10 19-7 5-10-20" fill="#d99069" stroke="#844d3f" stroke-width="2"/><path d="M37 49v17l9-5 3-12" fill="#f3d393"/><path d="M24 23h34v19q-4 15-17 15T24 40Z" fill="#e9b68d" stroke="#7c5b40" stroke-width="2"/><path d="M25 32h8m14 0h8" stroke="#423b2e" stroke-width="3"/><path d="M39 43q5 3 8-1" fill="none" stroke="#9e654a" stroke-width="2"/><path d="M23 23 29 5h23l9 19" fill="#e9ce91" stroke="#7c6e42" stroke-width="2"/><path d="M25 17h32v8H25Z" fill="#47715b"/><path d="M15 25q24-9 50 0l1 8q-24-6-52 0Z" fill="#f6dfa4" stroke="#7c6e42" stroke-width="2"/></symbol>
</defs>`;

function drawBoard(config: TreasureConfig): void {
  const cells: string[] = [];
  tiles = [];
  element("board-buttons").replaceChildren();
  for (let row = 0; row < config.height; row++) {
    for (let column = 0; column < config.width; column++) {
      const left = 72 + column * 152;
      const top = 72 + row * 152;
      cells.push(`<rect x="${left}" y="${top + 5}" width="148" height="148" rx="7" fill="#98b18a"/><rect x="${left}" y="${top}" width="148" height="148" rx="7" fill="${(row + column) % 2 ? "#c5d7ad" : "#d5dfbe"}"/><rect x="${left}" y="${top}" width="148" height="148" rx="7" fill="url(#earth)"/><path d="M${left + 13} ${top + 130}l-2-7m2 7 4-9m113-89 3-5m-3 5-1-7" stroke="#92ae7c" stroke-width="2" fill="none"/>`);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "map-cell";
      button.dataset.column = String(column);
      button.dataset.row = String(row);
      button.disabled = true;
      button.addEventListener("click", () => { if (button.dataset.direction) move(button.dataset.direction as Direction); });
      element("board-buttons").append(button);
      tiles.push(button);
    }
  }
  element("board-art").innerHTML = `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    ${artwork}<rect width="600" height="600" fill="#e2ebda"/><path d="M0 123Q86 168 43 313T0 551M600 83q-86 106-43 218t43 212" stroke="#cfdcc4" stroke-width="55" fill="none"/>
    <path d="M83 56h435q25 0 25 25v436q0 26-25 26H83q-27 0-27-26V83q0-27 27-27Z" fill="#b5c8a4"/>
    ${cells.join("")}
    <path d="M122 148h44m-22-22v44" stroke="#98b888" stroke-width="3" stroke-linecap="round"/>
    ${config.walls.map(wall => `<use href="#ruin" x="${wall.x * 152 + 82}" y="${wall.y * 152 + 76}" width="128" height="136"/>`).join("")}
    <g id="gate"><use href="#gate-art" x="${config.exit.x * 152 + 86}" y="${config.exit.y * 152 + 68}" width="120" height="145"/></g>
    ${config.treasures.map(treasure => `<g class="board-relic" data-relic="${treasure.id}"><use href="#relic-art" x="${treasure.x * 152 + 96}" y="${treasure.y * 152 + 89}" width="100" height="108"/></g>`).join("")}
    <use href="#fern" x="5" y="3" width="76" height="90" transform="rotate(-22 44 48)"/><use href="#fern" x="510" y="498" width="87" height="100" transform="rotate(30 550 550)"/>
    <use href="#fern" x="-13" y="452" width="70" height="95" transform="rotate(-32 26 500)"/><use href="#fern" x="542" y="53" width="58" height="85" transform="rotate(25 570 96)"/>
    <path d="M73 570q18-27 36-8m410-527q-19 14-30-2" stroke="#779667" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g id="explorer"><use href="#explorer-art" x="106" y="91" width="80" height="105"/></g>
  </svg>`;
}

export function paintBoard(config: TreasureConfig, state: GameState | null): void {
  if (tiles.length === 0) drawBoard(config);
  const position = state?.position ?? config.start;
  const collected = state?.collected ?? [];
  const active = state?.status === "playing";
  const finished = state !== null && !active;
  element("board").dataset.phase = state?.status ?? "ready";
  const player = document.getElementById("explorer");
  if (player instanceof SVGElement) player.style.transform = `translate(${position.x * 152}px, ${position.y * 152}px)`;
  for (const relic of document.querySelectorAll<SVGElement>("[data-relic]")) {
    relic.classList.toggle("collected", collected.includes(relic.dataset.relic ?? ""));
  }
  element("gate").classList.toggle("unlocked", config.treasures.every(treasure => collected.includes(treasure.id)));
  for (const tile of tiles) {
    const column = Number(tile.dataset.column);
    const row = Number(tile.dataset.row);
    const horizontal = column - position.x;
    const vertical = row - position.y;
    const direction: Direction | undefined = horizontal === 0 && vertical === -1 ? "north" : horizontal === 1 && vertical === 0 ? "east" : horizontal === 0 && vertical === 1 ? "south" : horizontal === -1 && vertical === 0 ? "west" : undefined;
    const wall = config.walls.some(point => point.x === column && point.y === row);
    const treasure = config.treasures.find(point => point.x === column && point.y === row);
    const description = horizontal === 0 && vertical === 0 ? "Explorer" : wall ? "Ruins" : treasure && !collected.includes(treasure.id) ? "Treasure" : column === config.exit.x && row === config.exit.y ? "Exit" : "Path";
    tile.setAttribute("aria-label", `${description}, column ${column + 1}, row ${row + 1}`);
    tile.title = description;
    tile.dataset.direction = direction ?? "";
    tile.disabled = !active || direction === undefined;
    tile.classList.toggle("reachable", active && direction !== undefined && !wall);
    tile.classList.toggle("occupied", horizontal === 0 && vertical === 0);
  }
  element("moves-value").textContent = String(state?.movesRemaining ?? config.initialMoves);
  element("score-value").textContent = String(state?.score ?? 0);
  element("treasure-value").innerHTML = `${collected.length}<span class="metric-total"> / ${config.treasures.length}</span>`;
  const remaining = state?.movesRemaining ?? config.initialMoves;
  [...element("move-pips").children].forEach((pip, index) => {
    pip.classList.toggle("spent", index >= remaining);
    pip.classList.toggle("last-move", remaining === 1 && index === 0);
  });
  element("relic-step").classList.toggle("done", collected.length === config.treasures.length);
  element("exit-step").classList.toggle("done", state?.status === "won");
  element("quest-title").textContent = state?.status === "won" ? "A treasure well earned." : state?.status === "lost" ? "Every trail teaches." : collected.length ? "The gate is waiting" : "Recover the lost relic";
  element("banner-text").textContent = state?.status === "won" ? "Expedition complete" : state?.status === "lost" ? "Out of moves" : "Your expedition awaits";
  element("board-banner").hidden = state !== null && !finished;
  const launch = element("board-launch") as HTMLButtonElement;
  launch.disabled = active;
  launch.title = finished ? "Play again" : "Start expedition";
  launch.setAttribute("aria-label", launch.title);
  launch.replaceChildren(icon(finished ? RotateCcw : Play));
}

export function showBoardRejection(): void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  element("board-art").animate([{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0)" }], { duration: 180 });
}