import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Hero-Card.module.scss';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import useDebounce from '../../hooks/useDebounce';
import { Button } from '../Button/Button';
import { EColor, ESize } from '../../enums';

const cx = classNames.bind(styles);

export const HeroCard: React.FC<{
    children: React.ReactNode;
    spaceBetween?: number;
}> = ({ children, spaceBetween = 20 }) => {
    const viewPortRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [viewportWidth, setViewportWidth] = useState<number>(0);
    const [childrenWidth, setChildrenWidth] = useState<number>(0);
    const [childrenInViewPort, setChildrenInViewPort] = useState<number[]>([]);
    const [disableNext, setDisableNext] = useState<boolean>(false);
    const [disablePrev, setDisablePrev] = useState<boolean>(true);

    const handleResize = () => {
        if (viewPortRef.current) {
            setViewportWidth(viewPortRef.current.clientWidth);

            const chidlrens = viewPortRef.current.children as HTMLCollectionOf<HTMLDivElement>;
            if (chidlrens.length > 0) {
                setChildrenWidth(chidlrens[0].offsetWidth);
            }
        }
    };

    const checkSlidesInViewport = () => {
        if (!viewPortRef.current) return;

        const childrens = Array.from(viewPortRef.current.children) as HTMLDivElement[];

        if (childrens.length === 0) return;

        const visibleChildrens = childrens
            .map((slide, index) => {
                const rect = slide.getBoundingClientRect();
                const isVisible = rect.left >= 0 && rect.right <= window.innerWidth;
                return isVisible ? index : -1;
            })
            .filter((index) => index !== -1);

        setChildrenInViewPort(visibleChildrens);

        childrens.forEach((slide, index) => {
            if (visibleChildrens.includes(index)) {
                slide.removeAttribute('inert');
            } else {
                slide.setAttribute('inert', '');
            }
        });

        setDisablePrev(visibleChildrens.includes(0));
        setDisableNext(visibleChildrens.includes(childrens.length - 1));
    };

    const debounceViewPortWidth = useDebounce(viewportWidth, 500);

    useEffect(() => {
        handleResize();
        const resizeListener = () => handleResize();
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, [children, debounceViewPortWidth]);

    useEffect(() => {
        checkSlidesInViewport();
    }, [scrollPosition, childrenWidth, debounceViewPortWidth]);

    const setScrollToPosition = (position: number) => {
        if (viewPortRef.current) {
            window.requestAnimationFrame(() => {
                viewPortRef.current!.scrollTo({
                    left: position,
                    behavior: 'smooth',
                });
            });
        }
    };

    const next = () => {
        setScrollToPosition(scrollPosition + childrenInViewPort.length * childrenWidth + spaceBetween);
    };

    const previous = () => {
        setScrollToPosition(scrollPosition - childrenInViewPort.length * childrenWidth - spaceBetween);
    };

    return (
        <div
            className={cx('carousel__wrapper')}
            style={
                {
                    '--space-between': `${spaceBetween}px`,
                } as React.CSSProperties
            }
        >
            <div className={cx('carousel__container')}>
                <div className={cx('carousel__scroller')}>
                    <div className={cx('carousel__scroller__wrapper')}>
                        <div className={cx('carousel__scroller__track')} ref={viewPortRef} onScroll={() => setScrollPosition(viewPortRef.current?.scrollLeft || 0)}>
                            {children}
                        </div>
                    </div>
                </div>
                <div className={cx('carousel___controls')}>
                    <div className={cx('carousel___buttons')}>
                        <Button padding className={cx('swiperButtonPrev', { disable: disablePrev })} onClick={previous} aria-label="Previous slide">
                            <GrFormPrevious size={ESize.ICON + 10} color={EColor.LIGHT_COLOR} />
                        </Button>
                        <Button padding className={cx('swiperButtonNext', { disable: disableNext })} onClick={next} aria-label="Next slide">
                            <GrFormNext size={ESize.ICON + 10} color={EColor.LIGHT_COLOR} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
