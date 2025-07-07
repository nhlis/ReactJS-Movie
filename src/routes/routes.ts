import React from 'react';

import { routes } from '@/configs';
import Main from '@/layouts/main/Main';
import Overview from '@/pages/Overview/Overview';
import Watch from '@/pages/Watch/Watch';
import Home from '@/pages/Home/Home';
import Search from '@/pages/Search/Search';
import SwitchProfile from '@/pages/SwitchProfile/SwitchProfile';
import History from '@/pages/History/History';
import Bookmark from '@/pages/Bookmark/Bookmark';
import New from '@/pages/New/New';
import Popular from '@/pages/Popular/Popular';
import Genre from '@/pages/Genre/Genre';
import Simulcast from '@/pages/Simulcast/Simulcast';

interface Router {
    path: string;
    component: React.FC | React.LazyExoticComponent<React.FC>;
    layout?: React.FC<{ children: React.ReactNode }>;
}

const RoutesConfig: Router[] = [
    { path: routes.home, component: Home, layout: Main },
    { path: routes.overview, component: Overview, layout: Main },
    { path: routes.watch, component: Watch, layout: Main },
    { path: routes.bookmark, component: Bookmark, layout: Main },
    { path: routes.history, component: History, layout: Main },
    { path: routes.search, component: Search, layout: Main },
    { path: routes.new, component: New, layout: Main },
    { path: routes.popular, component: Popular, layout: Main },
    { path: routes.simulcast, component: Simulcast, layout: Main },
    { path: routes.genres, component: Genre, layout: Main },
    { path: routes.switch, component: SwitchProfile, layout: undefined },
];

export default RoutesConfig;
