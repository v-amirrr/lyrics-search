import React from 'react';

import Search from './Search';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <>
            <HomePageContainer>
                <Search />
            </HomePageContainer>
        </>
    );
};

const HomePageContainer = styled(motion.section)`
    width: 100%;
    height: 100vh;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    background-color: #ffffff11;
`;

export default HomePage;