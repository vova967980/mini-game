import { type ChangeEvent, type FC, useState } from 'react';
import styles from './Settings.module.css';
import type { GameSpeed } from '../../types';
import { Button } from '@ui-kit';

interface SettingsProps {
    onStart: () => void;
    speedValue: GameSpeed;
    onChangeSpeed: (value: GameSpeed) => void;
    isRunningGame: boolean;
}

const GAME_SPEED_MIN = 100;

//TODO: use react-hook-form with yup
//TODO: move input, field with label + error to ui-kit
export const Settings: FC<SettingsProps> = ({
    onStart,
    onChangeSpeed,
    speedValue,
    isRunningGame,
}) => {
    const [error, setError] = useState<string | null>(null);

    const handleChangeSpeed = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (isNaN(value)) return;

        onChangeSpeed(value);
    };

    const handleStart = () => {
        if (!speedValue) {
            setError('Game speed is required.');
            return;
        }
        if (speedValue < GAME_SPEED_MIN) {
            setError('Game speed should be at least 100ms.');
            return;
        }

        setError(null);
        onStart();
    };

    return (
        <div>
            <label className={styles.field}>
                <span>Game speed (ms)</span>
                <input
                    name="game-speed"
                    type="number"
                    min={GAME_SPEED_MIN}
                    value={speedValue ?? ''}
                    onChange={handleChangeSpeed}
                    disabled={isRunningGame}
                />
                <span className={styles.error}>{error}</span>
            </label>
            <Button
                onClick={handleStart}
                disabled={isRunningGame}
            >
                Start
            </Button>
        </div>
    );
};
