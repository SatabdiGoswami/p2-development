export function initialState(config) {
    return {
        position: { ...config.start },
        movesRemaining: config.initialMoves,
        score: 0,
        collected: [],
        status: "playing",
    };
}
export function evaluate(config, state, action) {
    if (isFinished(state))
        return { accepted: false, reason: "GAME_COMPLETE", state };
    if (typeof action !== "object" || action === null || !("type" in action) ||
        action.type !== "move" || !("direction" in action)) {
        return { accepted: false, reason: "INVALID_ACTION", state };
    }
    let offset;
    switch (action.direction) {
        case "north":
            offset = { x: 0, y: -1 };
            break;
        case "east":
            offset = { x: 1, y: 0 };
            break;
        case "south":
            offset = { x: 0, y: 1 };
            break;
        case "west":
            offset = { x: -1, y: 0 };
            break;
        default: return { accepted: false, reason: "INVALID_ACTION", state };
    }
    const position = { x: state.position.x + offset.x, y: state.position.y + offset.y };
    if (position.x < 0 || position.x >= config.width || position.y < 0 || position.y >= config.height) {
        return { accepted: false, reason: "EDGE", state };
    }
    if (config.walls.some(wall => wall.x === position.x && wall.y === position.y)) {
        return { accepted: false, reason: "WALL", state };
    }
    const found = config.treasures.filter(treasure => treasure.x === position.x &&
        treasure.y === position.y && !state.collected.includes(treasure.id));
    const collected = [...state.collected, ...found.map(treasure => treasure.id)];
    const score = state.score + found.reduce((total, treasure) => total + treasure.value, 0);
    const movesRemaining = state.movesRemaining - 1;
    const won = position.x === config.exit.x && position.y === config.exit.y &&
        config.treasures.every(treasure => collected.includes(treasure.id));
    return {
        accepted: true,
        reason: null,
        state: { position, movesRemaining, score, collected, status: won ? "won" : movesRemaining === 0 ? "lost" : "playing" },
    };
}
export function isFinished(state) {
    return state.status !== "playing";
}
//# sourceMappingURL=rules.js.map