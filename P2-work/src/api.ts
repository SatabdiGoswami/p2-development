import { GENRE } from "./genre.js";
import { parseConfig, type ConfigFor } from "./supplied/config.js";

export async function loadConfig(): Promise<ConfigFor<typeof GENRE>> {
  let response: Response;
  try {
    response = await fetch("/api/boards/reference", { cache: "no-store" });
  } catch {
    throw new Error("Network failure: game data unavailable");
  }
  if (!response.ok) throw new Error(`Game data request failed: HTTP ${response.status}`);
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new Error("Game data contains malformed JSON");
  }
  return parseConfig(GENRE, data);
}
