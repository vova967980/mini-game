import React, { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Popup.module.css';

type PopupProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    overlayClassName?: string;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    lockScroll?: boolean;
    ariaLabel?: string;
};

const ensurePortalRoot = (id: string) => {
    let el = document.getElementById(id);
    if (!el) {
        el = document.createElement('div');
        el.id = id;
        document.body.appendChild(el);
    }
    return el;
};

export function Popup({
    open,
    onClose,
    children,
    className,
    overlayClassName,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    lockScroll = true,
    ariaLabel = 'Dialog',
}: PopupProps) {
    const portalEl = useMemo(() => {
        if (typeof document === 'undefined') return null;
        return ensurePortalRoot('portal-root');
    }, []);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const prevActiveElRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!open) return;

        prevActiveElRef.current = document.activeElement as HTMLElement | null;

        const onKeyDown = (e: KeyboardEvent) => {
            if (closeOnEsc && e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', onKeyDown);

        queueMicrotask(() => {
            contentRef.current?.focus();
        });

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            prevActiveElRef.current?.focus?.();
        };
    }, [open, closeOnEsc, onClose]);

    useEffect(() => {
        if (!open || !lockScroll) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [open, lockScroll]);

    if (!open || !portalEl) return null;

    return createPortal(
        <div
            className={overlayClassName ?? styles.overlay}
            onMouseDown={(e) => {
                if (!closeOnOverlayClick) return;
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                ref={contentRef}
                className={className ?? styles.content}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                tabIndex={-1}
            >
                {children}
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
        </div>,
        portalEl,
    );
}
