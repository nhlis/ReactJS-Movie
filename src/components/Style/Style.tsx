import React from 'react';
import './Style.scss';

function Style({ children }: { children: React.ReactNode }) {
    return <div className={'dark__theme'}>{children}</div>;
}

export default Style;
