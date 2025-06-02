import React, { useEffect, useRef, useState } from 'react';
import styles from './HeroSlide.module.scss';
import classNames from 'classnames/bind';
import { useAutoSlide } from '../../../hooks/useAutoSlide';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { ESize } from '../../../enums';

const cx = classNames.bind(styles);

export const HeroSlide: React.FC<{ children: React.ReactNode; duration?: number }> = ({ children, duration = 5 }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const totalChildrens: number = React.Children.count(children);
    const divRef = useRef<HTMLDivElement>(null);

    const { pause, resume, isRunning, resetTimer } = useAutoSlide({
        interval: duration * 1000,
        onNext: () => nextSlide(),
    });

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1 + totalChildrens) % totalChildrens);
        resetTimer(); // Reset timer khi chuyển slide thủ công
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalChildrens) % totalChildrens);
        resetTimer(); // Reset timer khi chuyển slide thủ công
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') prevSlide();
        if (event.key === 'ArrowRight') nextSlide();
    };

    useEffect(() => {
        divRef.current?.focus();
    }, []);

    return (
        <div ref={divRef} className={cx('heroSlides')} tabIndex={0} onKeyDown={(event) => handleKeyDown(event)}>
            {React.Children.map(children, (child, index) => (
                <div style={{ display: index === currentIndex ? 'block' : 'none' }}>{child}</div>
            ))}
            <div className={cx('heroSlides__loadingBar__container')}>
                {Array.from({ length: totalChildrens }).map((_, index) => {
                    return (
                        <div
                            onClick={() => {
                                if (index === currentIndex) return;
                                setCurrentIndex(index);
                                resetTimer();
                            }}
                            key={index}
                            className={cx('heroSlides__loadingBar', { active: index === currentIndex })}
                        >
                            <div
                                className={cx('heroSlides__loadingBar__item', { active: index === currentIndex })}
                                style={{ '--time': `${duration}s`, animationPlayState: !isRunning ? 'paused' : 'running' } as React.CSSProperties}
                            ></div>
                            <div className={cx('heroSlides__loadingBar__action', { active: index === currentIndex })} onMouseOver={pause} onMouseOut={resume}></div>
                        </div>
                    );
                })}
            </div>
            <div className={cx('heroSlides__actions')}>
                <div className={cx('heroSlides__actions__btn__prev')} onClick={prevSlide} onMouseOver={pause} onMouseOut={resume}>
                    <MdNavigateBefore size={ESize.ICON + 20} />
                </div>
                <div className={cx('heroSlides__actions__btn__next')} onClick={nextSlide} onMouseOver={pause} onMouseOut={resume}>
                    <MdNavigateNext size={ESize.ICON + 20} />
                </div>
            </div>
        </div>
    );
};
