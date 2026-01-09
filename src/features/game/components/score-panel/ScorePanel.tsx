import type { FC } from "react";
import styles from './ScorePanel.module.css';
import type { GameScoreType } from '../../types';

interface ScorePanelProps {
    score: GameScoreType
}

export const ScorePanel:FC<ScorePanelProps> = ({score: {player, computer}}) => {
    return (
        <div className={styles.container}>
            <span className={styles.firstPlayer}>Player</span>
            <span className={styles.scorePoints}>{player}:{computer}</span>
            <span className={styles.secondPlayer}>Computer</span>
        </div>
    );
};
