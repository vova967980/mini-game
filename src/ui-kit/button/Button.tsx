import clsx from 'clsx';
import styles from './Button.module.css';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...restProps }, ref) => {
    return (
        <button
            ref={ref}
            className={clsx(styles.primaryButton, className)}
            {...restProps}
        >
            {children}
        </button>
    );
});
