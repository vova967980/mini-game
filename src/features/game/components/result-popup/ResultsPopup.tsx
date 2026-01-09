import { type FC } from 'react';
import { Button, Popup } from '@ui-kit';
import styles from './ResultsPopup.module.css';
import type { GameScoreType, WinnerType } from '../../types';
import clsx from 'clsx';

interface ResultsPopupProps {
    onClose: () => void;
    score: GameScoreType;
    winner: WinnerType;
}

export const ResultsPopup: FC<ResultsPopupProps> = ({
    onClose,
    score,
    winner,
}) => {
    return (
        <Popup
            open
            onClose={onClose}
        >
            <h2 className={styles.title}>Game results</h2>

            <div className={styles.body}>
                <div>
                    Winner: <span className={clsx(winner && styles[winner])}>{winner}</span>
                </div>

                <div className={styles.kpiRow}>
                    <span className={styles.pill}>Player: {score.player}</span>
                    <span className={styles.pill}>
                        Computer: {score.computer}
                    </span>
                </div>
            </div>

            <div className={styles.footer}>
                <Button onClick={onClose}>OK</Button>
            </div>
        </Popup>
    );
};
