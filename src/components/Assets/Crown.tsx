import { EColor } from '@/enums';

export function Crown({
    className,
    width = '20px',
    fill = EColor.PREMIUM_COLOR,
    marginLeft,
    marginRight,
}: {
    className?: string;
    width?: string;
    fill?: EColor;
    marginLeft?: string;
    marginRight?: string;
}) {
    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height: '100%', marginLeft, marginRight }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill={fill} width={'100%'} className={className}>
                <path d="M2.419 13L0 4.797 4.837 6.94 8 2l3.163 4.94L16 4.798 13.581 13z"></path>
            </svg>
        </div>
    );
}
