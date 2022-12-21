import React, { useState } from 'react';

import { useLocation, useParams, Link } from 'react-router-dom';

import { useGetLyricsQuery, useGetTrackQuery } from '../redux/apiSlice';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';
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

    const [inputCheckbox, setInputCheckbox] = useState(false);

    return (
        <>
            <motion.section className='song-page' initial='hidden' animate='visible' exit='exit' variants={songPageVariants}>
                <div className='song-page__song-container'>
                    <div className='song-page__song-container__song-data'>
                        <p className='song-page__song-container__song-data__track'>
                            {trackData?.message?.body?.track?.track_name}
                        </p>
                        <p className='song-page__song-container__song-data__artist'>
                            {trackData?.message?.body?.track?.artist_name}
                        </p>
                        <p className='song-page__song-container__song-data__album'>
                            {trackData?.message?.body?.track?.album_name}
                        </p>
                        <p className='song-page__song-container__song-data__genre'>
                            {trackData?.message?.body?.track?.primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name}
                        </p>
                        <div className={inputCheckbox ? 'song-page__song-container__song-data__lyrics--open' : 'song-page__song-container__song-data__lyrics--close' }>
                            <div>
                                Song Lyrics
                                <input type="checkbox" onChange={() => setInputCheckbox(!inputCheckbox)} checked={inputCheckbox}/>
                                <i><IoChevronDown /></i>
                            </div>
                            <div>
                                {trackLyrics?.message?.body?.lyrics?.lyrics_body}
                            </div>
                        </div>
                    </div>

                    <a className="song-page__song-container__song-link link" href={trackData?.message?.body?.track?.track_share_url} target="_blank" rel="noopener noreferror">
                        Musixmatch Link
                    </a>

                    <div className='song-page__song-container__icons'>
                        {trackData?.message?.body?.track?.explicit ? <span>E</span> : ""}
                        {trackData?.message?.body?.track?.has_lyrics ? <span>L</span> : ""}
                    </div>

                    <Link to="/">
                        <motion.div className='song-page__song-container__back-btn' whileTap={{ scale: 0.8 }}>
                            <i><IoMdArrowRoundBack /></i>
                            <p>Back To Home</p>
                        </motion.div>
                    </Link>
                </div>
            </motion.section>
        </>
    );
};

export default SongPage;