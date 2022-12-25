import React, { useState, useEffect } from 'react';

import { useLocation, useParams, Link } from 'react-router-dom';

import { useGetLyricsQuery, useGetTrackQuery } from '../redux/apiSlice';

import Loader from './Loader';
import Error from './Error';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';
import "./SongPage.scss";
import { motion, AnimatePresence } from 'framer-motion';

const songPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween' } }
};

const songPageContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0, type: 'tween', staggerChildren: 0.05, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.1, type: 'tween', staggerChildren: 0.03, when: "afterChildren" } }
};

const songPageItemVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.4, type: 'tween' } }
};

const SongPage = () => {

    const { id } = useParams();
    const location = useLocation();

    const { data: trackData, isLoading: isLoadingTrack, isError: isErrorTrack } = useGetTrackQuery(id);

    const { data: trackLyrics, isLoading: isLoadingLyrics, isError: isErrorLyrics } = useGetLyricsQuery(id, {
        skip: !location.state
    });

    const [inputCheckbox, setInputCheckbox] = useState(false);
    const [loaderShow, setLoaderShow] = useState(true);

    useEffect(() => {
        setLoaderShow(true);
        if (!isLoadingTrack && !isLoadingLyrics) {
            setTimeout(() => {
                setLoaderShow(false);
            }, 800);
        }
    }, [id]);

    useEffect(() => {
        if (!isLoadingTrack && !isLoadingLyrics) {
            setLoaderShow(false);
        }
    }, [isLoadingTrack, isLoadingLyrics]);

    return (
        <>
            <motion.section className='song-page' initial='hidden' animate='visible' exit='exit' variants={songPageVariants}>
                <AnimatePresence exitBeforeEnter>
                    {loaderShow && !isErrorLyrics && !isErrorTrack ?
                    <Loader key="loader-song-page" /> :
                        isErrorLyrics || isErrorLyrics ?
                        <Error key="error-song-page" /> :
                        <motion.div className='song-page__song-container' variants={songPageContainerVariants}>
                            <div className='song-page__song-container__song-data'>
                                <motion.p className='song-page__song-container__song-data__track' variants={songPageItemVariants}>
                                    {trackData?.message?.body?.track?.track_name}
                                </motion.p>
                                <motion.p className='song-page__song-container__song-data__artist' variants={songPageItemVariants}>
                                    {trackData?.message?.body?.track?.artist_name}
                                </motion.p>
                                <motion.p className='song-page__song-container__song-data__album' variants={songPageItemVariants}>
                                    {trackData?.message?.body?.track?.album_name}
                                </motion.p>
                                <motion.p className='song-page__song-container__song-data__genre' variants={songPageItemVariants}>
                                    {trackData?.message?.body?.track?.primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name}
                                </motion.p>
                                <motion.div className={inputCheckbox ? 'song-page__song-container__song-data__lyrics--open' : 'song-page__song-container__song-data__lyrics--close'} variants={songPageItemVariants}>
                                    <div>
                                        Song Lyrics
                                        <input type="checkbox" onChange={() => setInputCheckbox(!inputCheckbox)} checked={inputCheckbox}/>
                                        <i><IoChevronDown /></i>
                                    </div>
                                    <div>
                                        {trackData?.message?.body?.track?.has_lyrics ?
                                        trackLyrics?.message?.body?.lyrics?.lyrics_body :
                                        "There is no lyrics avaible for this song."}
                                    </div>
                                </motion.div>
                            </div>

                            <motion.a className="song-page__song-container__song-link link" href={trackData?.message?.body?.track?.track_share_url} target="_blank" rel="noopener noreferror" variants={songPageItemVariants}>
                                Musixmatch Link
                            </motion.a>

                            <motion.div className='song-page__song-container__icons' variants={songPageItemVariants}>
                                {trackData?.message?.body?.track?.explicit ? <span>E</span> : ""}
                                {trackData?.message?.body?.track?.has_lyrics ? <span>L</span> : ""}
                            </motion.div>

                            <Link to="/">
                                <motion.div className='song-page__song-container__back-btn' variants={songPageItemVariants}>
                                    <i><IoMdArrowRoundBack /></i>
                                    <p>Back To Home</p>
                                </motion.div>
                            </Link>
                        </motion.div>}
                </AnimatePresence>
            </motion.section>
        </>
    );
};

export default SongPage;