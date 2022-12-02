import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './components/HomePage';
import WarningPopup from './components/WarningPopup';
import SongPage from './components/SongPage';

import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

const App = () => {

    const location = useLocation();

    return (
        <>
            <Background><img src='/images/bg.jpg' alt="background" /></Background>
            <AnimatePresence>
                <WarningPopup />
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/:id" element={<SongPage />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

const Background = styled.div`
    position: absolute;
    inset: 0 0 0 0;
    z-index: -9;
    
    img {
        filter: blur(5px);
        width: 100%;
        height: 100%;
        z-index: -10;
    }
`;

export default App;