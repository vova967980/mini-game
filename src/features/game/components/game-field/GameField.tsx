import type {FC, ReactNode} from 'react';
import styles from './GameField.module.css';

interface GameFieldProps {
    children: ReactNode;
}

export const GameField: FC<GameFieldProps> = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};
