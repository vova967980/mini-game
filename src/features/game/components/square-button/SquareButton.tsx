import type {ButtonHTMLAttributes, FC} from "react";
import clsx from "clsx";
import styles from './SquareButton.module.css';
import type {GameCellStatus} from "../../types";

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    status: GameCellStatus;
    isActive: boolean;
}

export const SquareButton: FC<SquareButtonProps> = ({status, isActive, className, ...restProps}) => {
    const receiveStatusClassName = () => {
        if(isActive) return styles.active;
        if(status === 'success') return styles.success;
        if(status === 'miss') return styles.error;
    }

    return (
        <button
            tabIndex={-1}
            className={clsx(
                styles.buttonContainer,
                receiveStatusClassName(),
                className)}
            {...restProps}
        />
    )
}
