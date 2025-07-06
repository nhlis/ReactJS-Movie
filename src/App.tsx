import { Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoutesConfig from './routes/routes';

function App() {
    return (
        <>
            <Router>
                <div className="app">
                    <Routes>
                        {RoutesConfig.map((route, index) => {
                            const Page = route.component;
                            const Layout = route.layout || Fragment;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <Page />
                                            </Suspense>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
