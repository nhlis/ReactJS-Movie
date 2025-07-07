import React from 'react';
import '@/components/Style/Style.scss';

function Style({ children }: { children: React.ReactNode }) {
    return <div className={'dark__theme'}>{children}</div>;
}

export default Style;
