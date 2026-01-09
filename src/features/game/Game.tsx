import { type FC, useState } from 'react';
import { GameField, ScorePanel, Settings, SquareButton } from './components';
import { useGameCore } from './hooks';
import styles from './Game.module.css';
import type { GameSpeed } from './types';
import { ResultsPopup } from './components/result-popup';

export const Game: FC = () => {
    const [gameSpeed, setGameSpeed] = useState<GameSpeed>(null);
    const [isOpenResults, setIsOpenResults] = useState<boolean>(false);

    const {
        onClickCell,
        cells,
        onStart,
        score,
        isRunning,
        activeIndex,
        winner,
    } = useGameCore({
        gameSpeed,
        onResultsCallback: () => setIsOpenResults(true),
    });

    return (
        <div className={styles.gameContainer}>
            <Settings
                isRunningGame={isRunning}
                onStart={onStart}
                speedValue={gameSpeed}
                onChangeSpeed={setGameSpeed}
            />
            <ScorePanel score={score} />
            <GameField>
                {cells.map((cellStatus, key) => (
                    <SquareButton
                        key={key}
                        onClick={() => onClickCell(key)}
                        isActive={key === activeIndex}
                        status={cellStatus}
                    />
                ))}
            </GameField>
            {isOpenResults && (
                <ResultsPopup
                    score={score}
                    winner={winner}
                    onClose={() => setIsOpenResults(false)}
                />
            )}
        </div>
    );
};
