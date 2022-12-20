import React from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { useGetLyricsQuery, useGetTrackQuery } from '../redux/apiSlice';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const songPageVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: [1, 0.9, 1], transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween' } }
};

const SongPage = () => {

    const { id } = useParams();
    const location = useLocation();

    const { data: trackData } = useGetTrackQuery(id);

    const { data: trackLyrics } = useGetLyricsQuery(id, {
        skip: !location.state
    });

    return (
        <>
            <SongPageContainer initial='hidden' animate='visible' exit='exit' variants={songPageVariants}>
                {id}
            </SongPageContainer>
        </>
    );
};

const SongPageContainer = styled(motion.section)`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000011;
`;

export default SongPage;