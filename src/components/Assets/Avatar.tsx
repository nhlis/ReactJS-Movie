import { useState, useEffect } from 'react';

function Avatar({
    src,
    fallbackSrc = 'https://image.knite.online/1t9q5nCG6BseSmM06d59wFl_Gekj6pGl_=s200',
    className,
    width = '20px',
    marginLeft = '0',
    marginRight = '0',
    borderRadius = '1px',
}: {
    src?: string;
    fallbackSrc?: string;
    className?: string;
    width?: string;
    marginLeft?: string;
    marginRight?: string;
    borderRadius?: string;
}) {
    const isValidSrc = (url?: string) => url && url.trim() !== '';

    const [currentSrc, setCurrentSrc] = useState(isValidSrc(src) ? src : fallbackSrc);

    useEffect(() => {
        setCurrentSrc(isValidSrc(src) ? src : fallbackSrc);
    }, [src, fallbackSrc]);

    return (
        <img
            className={className}
            src={currentSrc}
            loading="lazy"
            width={width}
            style={{ maxWidth: width, minWidth: width, borderRadius, marginLeft, marginRight }}
            onError={() => {
                if (currentSrc !== fallbackSrc) {
                    setCurrentSrc(fallbackSrc);
                }
            }}
        />
    );
}

export default Avatar;
