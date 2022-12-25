import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useGetSearchTracksQuery } from '../redux/apiSlice';

import Loader from "./Loader";
import Error from './Error';

import "./Songs.scss";
import { motion, AnimatePresence } from 'framer-motion';

const songsContainerVariants = {
    exit: { opacity: 0, transition: { duration: 0.2, type: 'tween', when: "afterChildren" } }
};

const nothingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: [0.8, 1.05, 1], transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4, type: 'tween' } }
};

const songsVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, type: 'tween', when: "beforeChildren" } }
};

const songVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'tween' } },
};

const Songs = () => {

    const [loaderShow, setLoaderShow] = useState(true);
    const [nothingWasFound, setNothingWasFound] = useState(false);

    const searchInput = useSelector(state => state.searchStore.searchInputText);

    const { data: songsList, isLoading, isError } = useGetSearchTracksQuery(searchInput);

    useEffect(() => {
        setLoaderShow(true);
        if (!isLoading) {
            setTimeout(() => {
                setLoaderShow(false);
                if (songsList?.message?.body?.track_list.length == 0) {
                    setNothingWasFound(true);
                }
            }, 800);
        }
    }, [searchInput]);

    useEffect(() => {
        if (!isLoading) {
            setLoaderShow(false);
            if (songsList?.message?.body?.track_list.length == 0) {
                setNothingWasFound(true);
            }
        }
    }, [isLoading]);

    return (
        <>
            <motion.section className='songs-section' initial='hidden' animate='visible' exit='exit' variants={songsContainerVariants}>
                    <AnimatePresence exitBeforeEnter>
                        {loaderShow && !isError ?
                        <Loader key="loader-songs"/> :
                            isError ?
                            <Error key="error-songs" /> :
                                nothingWasFound ?
                                <motion.div key="nothing-was-found" initial='hidden' animate='visible' exit='exit' variants={nothingVariants}>
                                    NOTHING WAS FOUND
                                </motion.div> :
                                <motion.div key="songs" className='songs-section__songs-container' initial='hidden' animate='visible' exit='exit' variants={songsVariants}>
                                    {songsList?.message?.body?.track_list?.map(item => (
                                        <Link to={`/${item.track.commontrack_id}`} key={item.track.commontrack_id} state={item.track.has_lyrics}>
                                            <motion.div className='songs-section__songs-container__song' variants={songVariants} whileTap={{ scale: 0.8 }}>
                                                <div className='songs-section__songs-container__song__icons'>
                                                    {item.track.explicit ? <span>E</span> : ""}
                                                    {item.track.has_lyrics ? <span>L</span> : ""}
                                                </div>
                                                <p className='songs-section__songs-container__song__name'>{item.track.track_name}</p>
                                                <p className='songs-section__songs-container__song__artist'>{item.track.artist_name}</p>
                                                <p className='songs-section__songs-container__song__genre'>{item.track.primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name}</p>
                                                <div className='songs-section__songs-container__song__click-text'><p>Click For More Details</p></div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </motion.div>}
                    </AnimatePresence>
            </motion.section>
        </>
    );
};

export default Songs;