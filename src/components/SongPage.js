import React from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { useGetLyricsQuery } from '../redux/apiSlice';

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
    const { album_name, artist_name, explicit, has_lyrics, primary_genres, track_name } = location.state;

    const { data: TrackLyrics } = useGetLyricsQuery(id, {
        skip: !has_lyrics
    });
    
    return (
        <>
            <SongPageContainer initial='hidden' animate='visible' exit='exit' variants={songPageVariants}>
                <p>{album_name}</p>
                <p>{artist_name}</p>
                <p>{explicit}</p>
                <p>{has_lyrics}</p>
                <p>{primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name}</p>
                <p>{track_name}</p>
                <p>{TrackLyrics?.message?.body?.lyrics?.lyrics_body}</p>
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