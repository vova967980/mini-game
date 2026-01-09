import { useCallback, useEffect, useRef, useState } from 'react';
import type {
    GameCellsList,
    GameScoreType,
    GameSpeed,
    WinnerType,
} from '../types';
import { generateGameCells } from '../utils';

type UseGameCoreProps = {
    gameSpeed: GameSpeed;
    onResultsCallback: () => void;
};

const GAME_WIN_SCORE = 10;

export const useGameCore = ({
    gameSpeed,
    onResultsCallback,
}: UseGameCoreProps) => {
    const [cells, setCells] = useState<GameCellsList>(generateGameCells());
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [score, setScore] = useState<GameScoreType>({
        player: 0,
        computer: 0,
    });
    const [winner, setWinner] = useState<WinnerType>(null);

    const timeoutRef = useRef<number | null>(null);

    const stopTimers = () => {
        if (timeoutRef.current != null) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const pickNextCell = useCallback(() => {
        const available: number[] = [];
        for (let i = 0; i < cells.length; i++)
            if (cells[i] === 'idle') available.push(i);
        if (available.length === 0) return null;

        return available[Math.floor(Math.random() * available.length)];
    }, [cells]);

    const startRound = useCallback(() => {
        if (!isRunning || winner || gameSpeed == null) return;

        stopTimers();
        const nextIndex = pickNextCell();

        if (nextIndex === null) return;

        setActiveIndex(nextIndex);

        timeoutRef.current = window.setTimeout(() => {
            setCells((prev) => {
                const newCells = [...prev];
                newCells[nextIndex] = 'miss';
                return newCells;
            });
            setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
            setActiveIndex(null);
        }, gameSpeed);
    }, [cells, gameSpeed, isRunning, winner]);

    useEffect(() => {
        if (!isRunning) return;
        if (winner) return;
        if (activeIndex === null) startRound();
    }, [isRunning, winner, activeIndex, startRound]);

    useEffect(() => {
        if (score.player >= GAME_WIN_SCORE) setWinner('player');
        if (score.computer >= GAME_WIN_SCORE) setWinner('computer');
    }, [score]);

    useEffect(() => {
        if (winner) {
            stopTimers();
            setIsRunning(false);
            setActiveIndex(null);
            onResultsCallback();
        }
    }, [winner]);

    const onStart = useCallback(() => {
        if (gameSpeed === null) return;
        setWinner(null);
        setScore({ player: 0, computer: 0 });
        setCells(generateGameCells());
        setIsRunning(true);
        setActiveIndex(null);
    }, [gameSpeed]);

    const onClickCell = useCallback(
        (index: number) => {
            if (!isRunning || winner) return;
            if (index !== activeIndex) return;

            stopTimers();
            setCells((prev) => {
                const newCells = [...prev];
                newCells[index] = 'success';
                return newCells;
            });
            setScore((prev) => ({ ...prev, player: prev.player + 1 }));
            setActiveIndex(null);
        },
        [activeIndex, isRunning, winner],
    );

    const resetGame = useCallback(() => {
        stopTimers();
        setIsRunning(false);
        setWinner(null);
        setScore({ player: 0, computer: 0 });
        setActiveIndex(null);
        setCells(generateGameCells());
    }, []);

    return {
        isRunning,
        cells,
        onStart,
        onClickCell,
        score,
        resetGame,
        activeIndex,
        winner,
    };
};
