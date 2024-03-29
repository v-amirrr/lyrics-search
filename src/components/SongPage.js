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
    exit: { opacity: 0, transition: { duration: 0, type: 'tween', staggerChildren: 0.05, when: "afterChildren" } }
};

const songPageItemVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.5 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, y: 20, scale: 0.5, transition: { duration: 0.4, type: 'tween' } }
};

const SongPage = () => {

    const { id } = useParams();
    const location = useLocation();

    const [inputCheckbox, setInputCheckbox] = useState(false);
    const [loaderShow, setLoaderShow] = useState(true);
    const [trackData, setTrackData] = useState(null);

    const { data: trackDataFromAPI, isLoading: isLoadingTrackFromAPI, isError: isErrorTrackFromAPI } = useGetTrackQuery(id, {
        skip: !!location.state
    });

    const { data: trackLyrics, isLoading: isLoadingLyrics, isError: isErrorLyrics } = useGetLyricsQuery(id, {
        skip: trackData?.message?.body?.track?.has_lyrics,
    });

    useEffect(() => {
        setLoaderShow(true);
        if (!isLoadingTrackFromAPI && !isLoadingLyrics) {
            setTimeout(() => {
                setLoaderShow(false);
            }, 800);
        }
    }, [id]);

    useEffect(() => {
        if (!isLoadingTrackFromAPI && !isLoadingLyrics) {
            setLoaderShow(false);
        }
    }, [isLoadingTrackFromAPI, isLoadingLyrics]);

    useEffect(() => {
        if (location.state) {
            setTrackData(location.state);
        } else {
            setTrackData(trackDataFromAPI?.message?.body?.track);
        }
    }, []);

    useEffect(() => {
        if (location.state) {
            setTrackData(location.state);
        } else {
            setTrackData(trackDataFromAPI?.message?.body?.track);
        }
    }, [trackDataFromAPI]);

    return (
        <>
            <motion.section className='song-page' initial='hidden' animate='visible' exit='exit' variants={songPageVariants}>
                <AnimatePresence exitBeforeEnter>
                    {loaderShow && !isErrorLyrics && !isErrorTrackFromAPI ?
                    <Loader key="loader-song-page" /> :
                    isLoadingTrackFromAPI || isErrorLyrics ?
                        <Error key="error-song-page" /> :
                        <motion.div className='song-page__song-container' variants={songPageContainerVariants}>
                            <div className='song-page__song-container__song-data'>
                                <motion.p className='song-page__song-container__song-data__track' variants={songPageItemVariants}>
                                    {trackData?.track_name}
                                </motion.p>
                                <motion.p className='song-page__song-container__song-data__artist' variants={songPageItemVariants}>
                                    {trackData?.artist_name}
                                </motion.p>
                                <motion.p className='song-page__song-container__song-data__album' variants={songPageItemVariants}>
                                    {trackData?.album_name}
                                </motion.p>
                                <motion.p className='song-page__song-container__song-data__genre' variants={songPageItemVariants}>
                                    {trackData?.primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name}
                                </motion.p>
                                <motion.div className={inputCheckbox ? 'song-page__song-container__song-data__lyrics--open' : 'song-page__song-container__song-data__lyrics--close'} variants={songPageItemVariants}>
                                    <div>
                                        Song Lyrics
                                        <input type="checkbox" onChange={() => setInputCheckbox(!inputCheckbox)} checked={inputCheckbox}/>
                                        <i><IoChevronDown /></i>
                                    </div>
                                    <div>
                                        {trackData?.has_lyrics ?
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
                        </motion.div>}
                </AnimatePresence>

                <Link to="/">
                    <motion.div className='song-page__song-container__back-btn' variants={songPageItemVariants}>
                        <i><IoMdArrowRoundBack /></i>
                        <p>Back To Home</p>
                    </motion.div>
                </Link>
            </motion.section>
        </>
    );
};

export default SongPage;