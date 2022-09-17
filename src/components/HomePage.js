import React from 'react';

import Header from './Header';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <>
            <HomePageContainer>
                <Header />
            </HomePageContainer>
        </>
    );
};

const HomePageContainer = styled(motion.section)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff11;
`;

export default HomePage;