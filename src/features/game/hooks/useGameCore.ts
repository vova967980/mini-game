import { useCallback, useEffect, useReducer, useRef } from 'react';
import type {
    GameSpeed,
} from '../types';
import { createInitialGameState, gameCoreReducer, pickNextCellIndex } from '../model';

type UseGameCoreProps = {
    gameSpeed: GameSpeed;
    onResultsCallback: () => void;
};

export const useGameCore = ({
    gameSpeed,
    onResultsCallback,
}: UseGameCoreProps) => {
    const [state, dispatch] = useReducer(
        gameCoreReducer,
        undefined,
        createInitialGameState,
    );
    const timeoutRef = useRef<number | null>(null);

    const stopTimers = useCallback(() => {
        if (timeoutRef.current != null) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    // If game is running and no active cell - pick new cell
    useEffect(() => {
        if (!state.isRunning) return;
        if (state.winner) return;
        if (gameSpeed == null) return;
        if (state.activeIndex != null) return;

        const next = pickNextCellIndex(state.cells);
        if (next == null) return;

        dispatch({ type: 'ACTIVATE_NEXT', index: next });
    }, [
        state.isRunning,
        state.winner,
        state.activeIndex,
        state.cells,
        gameSpeed,
    ]);

    // If active cell exist - set timer on miss
    useEffect(() => {
        if (!state.isRunning) return;
        if (state.winner) return;
        if (gameSpeed == null) return;
        if (state.activeIndex == null) return;

        stopTimers();
        timeoutRef.current = window.setTimeout(() => {
            dispatch({ type: 'MISS_ACTIVE' });
        }, gameSpeed);

        return () => stopTimers();
    }, [
        state.isRunning,
        state.winner,
        state.activeIndex,
        gameSpeed,
        stopTimers,
    ]);

    // If winner exist - reset timers + trigger callback
    useEffect(() => {
        if (!state.winner) return;
        stopTimers();
        onResultsCallback();
    }, [state.winner, stopTimers, onResultsCallback]);

    const onStart = useCallback(() => {
        if (gameSpeed == null) return;
        stopTimers();
        dispatch({ type: 'START' });
    }, [gameSpeed, stopTimers]);

    const onClickCell = useCallback(
        (index: number) => {
            if (!state.isRunning || state.winner) return;
            if (index !== state.activeIndex) return;

            stopTimers();
            dispatch({ type: 'HIT_ACTIVE' });
        },
        [state.isRunning, state.winner, state.activeIndex, stopTimers],
    );

    const resetGame = useCallback(() => {
        stopTimers();
        dispatch({ type: 'RESET' });
    }, [stopTimers]);

    return {
        isRunning: state.isRunning,
        cells: state.cells,
        onStart,
        onClickCell,
        score: state.score,
        resetGame,
        activeIndex: state.activeIndex,
        winner: state.winner,
    };
};
