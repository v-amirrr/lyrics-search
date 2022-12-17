import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useGetTrackQuery } from '../redux/apiSlice';

import Loader from "./Loader";

import "./Songs.scss";
import { motion, AnimatePresence } from 'framer-motion';

const songsContainerVariants = {
    exit: { opacity: 0, transition: { duration: 0.2, type: 'tween', when: "afterChildren" } }
};

const errorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: [0.8, 1.1, 1], transition: { duration: 0.3, type: 'tween', staggerChildren: 0.1 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, type: 'tween', when: "beforeChildren" } }
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

    const searchInput = useSelector(state => state.searchStore.searchInputText);

    const { data: songsList, isLoading, isFetching, isError } = useGetTrackQuery(searchInput);

    useEffect(() => {
        if (searchInput) {
            setLoaderShow(true);
            if (!isLoading) {
                setLoaderShow(false);
            }
        }
    }, [searchInput]);

    return (
        <>
            <motion.section className='songs-section' initial='hidden' animate='visible' exit='exit' variants={songsContainerVariants}>
                    <AnimatePresence exitBeforeEnter>
                        {
                            isLoading && !isError
                            ?
                            <Loader key="loader"/>
                            :
                                isError
                                ?
                                <motion.div key="error" className='songs-section__error-container' initial='hidden' animate='visible' exit='exit' variants={errorVariants}>
                                    <p className='songs-section__error-container__icon'>╯︿╰</p>
                                    <p className='songs-section__error-container__error'>Looks like we have a problem.<br />Please check you connection status and try again.</p>
                                    <p className='songs-section__error-container__warning'>If you're in sanctioned countries like <b>Iran</b>, you have to turn on your <b>VPN</b> for using the app. If you're alredy using a VPN, clearly it's not working so please use another one.<br />{":("}</p>
                                </motion.div>
                                :
                                <motion.div key="songs" className='songs-section__songs-container' initial='hidden' animate='visible' exit='exit' variants={songsVariants}>
                                    {songsList?.message?.body?.track_list?.map(item => (
                                        <Link to={`/${item.track.track_id}`} key={item.track.track_id}>
                                            <motion.div className='songs-section__songs-container__song' variants={songVariants} whileTap={{ scale: 0.8 }}>
                                                <p className='songs-section__songs-container__song__name'>{item.track.track_name}</p>
                                                <p className='songs-section__songs-container__song__artist'>{item.track.artist_name}</p>
                                                <p className='songs-section__songs-container__song__genre'>{item?.track?.primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name}</p>
                                                <div className='songs-section__songs-container__song__click-text'><p>Click For More Details</p></div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </motion.div>
                        }
                    </AnimatePresence>
            </motion.section>
        </>
    );
};

export default Songs;