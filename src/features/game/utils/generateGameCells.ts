import type {GameCellsList} from "../types";

export const generateGameCells = (
    size = 100
): GameCellsList => (
    Array.from({length: size}, () => 'idle')
);
