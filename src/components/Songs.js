import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useGetTrackQuery } from '../redux/apiSlice';

import Loader from "./Loader";

import styled from 'styled-components';
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
                }, 1000);
            }
        }
    }, [searchInput]);

    return (
        <>
            <SongsContainer initial='hidden' animate='visible' exit='exit' variants={songsContainerVariants}>
                    <AnimatePresence exitBeforeEnter>
                        {
                            loaderShow
                            ?
                            <Loader key="loader" />
                            :
                            <motion.div key="songs" className='songs' initial='hidden' animate='visible' exit='exit' variants={songsVariants}>
                                {
                                    songsList?.map(item => (
                                        <Link to={`/${item.track.track_id}`} key={item.track.track_id}>
                                            <Song variants={songVariants} whileTap={{ scale: 0.8 }}>
                                                <p className='song-name'>{item.track.track_name}</p>
                                                <p className='song-artist'>{item.track.artist_name}</p>
                                                <p className='song-genre'>{item?.track?.primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name}</p>
                                                <div className='song-hover'><p>Click For More Details</p></div>
                                            </Song>
                                        </Link>
                                    ))
                                }
                            </motion.div>
                        }
                    </AnimatePresence>
            </SongsContainer>
        </>
    );
};

const SongsContainer = styled(motion.section)`
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
    user-select: none;
    position: absolute;
    bottom: 0;

    .songs {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        max-width: 70%;
        max-height: 90%;
        overflow: hidden scroll;

        @media (max-width: 745px) {
            max-width: 100%;
        }

        /* width */
        ::-webkit-scrollbar {
            width: .2rem;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            border-radius: 50px;
            background: #ffffff05;
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #ffffff22;
            border-radius: 50px;
        }
    }
`;

const Song = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 12rem;
    height: 8rem;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 12px;
    cursor: pointer;
    background-color: #ffffff08;
    margin: 1rem;
    font-family: 'Outfit', sans-serif;
    text-align: center;
    overflow: hidden;
    position: relative;
    color: #fff;

    p {
        max-width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: .2rem 0;
    }

    .song-name {
        font-size: 1.2rem;
        font-weight: 600;
    }

    .song-artist {
        font-size: .8rem;
        font-weight: 300;
    }

    .song-genre {
        font-size: .5rem;
        font-weight: 300;
    }

    .song-hover {
        font-weight: 500;
        font-size: .5rem;
        width: 100%;
        height: 1.5rem;
        position: absolute;
        bottom: 0;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff10;
        transition: opacity .3s, bottom .3s, background .3s;
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        margin: .5rem;

        .song-hover {
            bottom: -1rem;
            opacity: 0;

            &:hover {
                background-color: #ffffff22;
            }
        }

        &:hover {
            .song-hover {
                bottom: 0;
                opacity: 1;
            }
        }
    }
`;

export default Songs;