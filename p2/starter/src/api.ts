// OWNED BY YOU. Request the game data, separate HTTP and JSON failures, and call parseConfig.
//
// Route: GET /api/boards/reference (treasure) or GET /api/ranges/reference (range), same origin.
// Report each failure kind with its own message: network/HTTP failure, malformed JSON, and an
// unexpected definition (parseConfig throws ConfigError). Transport problems are not game status.

import { GENRE } from "./genre.js";
import type { ConfigFor } from "./supplied/config.js";

export async function loadConfig(): Promise<ConfigFor<typeof GENRE>> {
  throw new Error(`Game data loading is not implemented yet (src/api.ts) for the ${GENRE} route`);
}
