import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';

import styles from '@/components/Button/Button.module.scss';
const cx = classNames.bind(styles);

interface ButtonProps {
    to?: string;
    href?: string;
    primary?: boolean;
    hover?: boolean;
    outline?: boolean;
    text?: boolean;
    padding?: boolean;
    marginIcon?: boolean;
    marginLeft?: boolean;
    marginRight?: boolean;
    contentStart?: boolean;
    contentCenter?: boolean;
    contentEnd?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    className?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    to,
    href,
    primary = false,
    hover = false,
    outline = false,
    text = false,
    padding = false,
    marginIcon = false,
    marginLeft = false,
    marginRight = false,
    contentStart = false,
    contentCenter = false,
    contentEnd = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
}) => {
    const Component: React.ElementType = to ? Link : href ? 'a' : 'button';

    const props: React.HTMLProps<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        onClick,
        ...(href ? { href } : {}),
        ...(to ? { to } : {}),
    };

    if (disabled) {
        props.onClick = undefined;
    }

    const classes = cx('button', {
        primary,
        outline,
        hover,
        text,
        padding,
        marginIcon,
        marginRight,
        marginLeft,
        disabled,
        rounded,
        small,
        large,
        [className || '']: className,
    });

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('iconLeft')}>{leftIcon}</span>}
            <span className={cx('content', { start: contentStart, center: contentCenter, end: contentEnd })}>{children}</span>
            {rightIcon && <span className={cx('iconRight')}>{rightIcon}</span>}
        </Component>
    );
};
