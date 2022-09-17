import React from 'react';

import HomePage from './components/HomePage';

import { AnimatePresence } from 'framer-motion';

const App = () => {
    return (
        <>
            <AnimatePresence>
                <HomePage />
            </AnimatePresence>
        </>
    );
};

export default App;