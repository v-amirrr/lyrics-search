import React from 'react';

import Header from './components/Header';

import { AnimatePresence } from 'framer-motion';

const App = () => {
    return (
        <>
            <AnimatePresence>
                <Header />
            </AnimatePresence>
        </>
    );
};

export default App;