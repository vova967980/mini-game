import clsx from 'clsx';
import styles from './Button.module.css';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, ...restProps }, ref) => {
        return (
            <button
                ref={ref}
                className={clsx(styles.primaryButton, className)}
                {...restProps}
            >
                {children}
            </button>
        );
    },
);
