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

    const { data: songsList, loading } = useGetTrackQuery(searchInput, {
        selectFromResult: ({ data }) => ({
            data: data?.message?.body?.track_list,
        }),
    });

    useEffect(() => {
        if (searchInput) {
            setLoaderShow(true);
            if (!loading) {
                setTimeout(() => {
                    setLoaderShow(false);
                }, 500);
            }
        }
    }, [searchInput]);

    return (
        <>
            <motion.section className='songs-section' initial='hidden' animate='visible' exit='exit' variants={songsContainerVariants}>
                    <AnimatePresence exitBeforeEnter>
                        {
                            loaderShow
                            ?
                            <Loader key="loader" />
                            :
                            <motion.div key="songs" className='songs-section__songs-container' initial='hidden' animate='visible' exit='exit' variants={songsVariants}>
                                {
                                    songsList?.map(item => (
                                        <Link to={`/${item.track.track_id}`} key={item.track.track_id}>
                                            <motion.div className='songs-section__songs-container__song' variants={songVariants} whileTap={{ scale: 0.8 }}>
                                                <p className='songs-section__songs-container__song__name'>{item.track.track_name}</p>
                                                <p className='songs-section__songs-container__song__artist'>{item.track.artist_name}</p>
                                                <p className='songs-section__songs-container__song__genre'>{item?.track?.primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name}</p>
                                                <div className='songs-section__songs-container__song__click-text'><p>Click For More Details</p></div>
                                            </motion.div>
                                        </Link>
                                    ))
                                }
                            </motion.div>
                        }
                    </AnimatePresence>
            </motion.section>
        </>
    );
};

export default Songs;