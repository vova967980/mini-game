import type { GameCellsList, GameScoreType, WinnerType } from '../types';
import { generateGameCells } from '../utils';

export const GAME_WIN_SCORE = 10;

type GameCoreState = {
    cells: GameCellsList;
    activeIndex: number | null;
    isRunning: boolean;
    score: GameScoreType;
    winner: WinnerType;
};

type GameCoreAction =
    | { type: 'START' }
    | { type: 'RESET' }
    | { type: 'ACTIVATE_NEXT'; index: number }
    | { type: 'HIT_ACTIVE' }
    | { type: 'MISS_ACTIVE' };

export const getWinner = (s: GameScoreType): WinnerType => {
    if (s.player >= GAME_WIN_SCORE) return 'player';
    if (s.computer >= GAME_WIN_SCORE) return 'computer';
    return null;
};

export const pickNextCellIndex = (cells: GameCellsList): number | null => {
    const available: number[] = [];
    for (let i = 0; i < cells.length; i++) if (cells[i] === 'idle') available.push(i);
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
};

export const createInitialGameState = (): GameCoreState => ({
    cells: generateGameCells(),
    activeIndex: null,
    isRunning: false,
    score: { player: 0, computer: 0 },
    winner: null,
});

export function gameCoreReducer(state: GameCoreState, action: GameCoreAction): GameCoreState {
    switch (action.type) {
        case 'START':
            return { ...createInitialGameState(), isRunning: true };

        case 'RESET':
            return createInitialGameState();

        case 'ACTIVATE_NEXT':
            return { ...state, activeIndex: action.index };

        case 'HIT_ACTIVE': {
            if (!state.isRunning || state.winner || state.activeIndex == null) return state;

            const idx = state.activeIndex;
            const nextCells = [...state.cells];
            nextCells[idx] = 'success';

            const nextScore = { ...state.score, player: state.score.player + 1 };
            const winner = getWinner(nextScore);

            return {
                ...state,
                cells: nextCells,
                score: nextScore,
                winner,
                isRunning: winner ? false : state.isRunning,
                activeIndex: null,
            };
        }

        case 'MISS_ACTIVE': {
            if (!state.isRunning || state.winner || state.activeIndex == null) return state;

            const idx = state.activeIndex;
            const nextCells = [...state.cells];
            nextCells[idx] = 'miss';

            const nextScore = { ...state.score, computer: state.score.computer + 1 };
            const winner = getWinner(nextScore);

            return {
                ...state,
                cells: nextCells,
                score: nextScore,
                winner,
                isRunning: winner ? false : state.isRunning,
                activeIndex: null,
            };
        }

        default:
            return state;
    }
}
