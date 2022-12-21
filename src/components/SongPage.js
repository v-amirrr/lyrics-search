import React from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { useGetLyricsQuery, useGetTrackQuery } from '../redux/apiSlice';

import "./SongPage.scss";
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
            <motion.section className='song-page' initial='hidden' animate='visible' exit='exit' variants={songPageVariants}>
                <div className='song-page__song-container'>
                    <div className='song-page__song-container__icons'>
                        {trackData?.message?.body?.track?.explicit ? <span>E</span> : ""}
                        {trackData?.message?.body?.track?.has_lyrics ? <span>L</span> : ""}
                    </div>
                </div>
            </motion.section>
        </>
    );
};

export default SongPage;