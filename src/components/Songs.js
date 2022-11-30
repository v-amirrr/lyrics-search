import React, { useState, useEffect } from 'react';

import Loader from "./Loader";

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const songsVariants = {
    visible: { transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, type: 'tween', when: "beforeChildren" } }
};

const songVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, type: 'tween' } },
};

const Songs = ({ data, isLoading }) => {

    const [loaderShow, setLoaderShow] = useState(true);
    const [songsList, setSongsList] = useState([...data]);

    useEffect(() => {
        setLoaderShow(true);
        if (!isLoading) {
            setTimeout(() => {
                setLoaderShow(false);
                setSongsList([...data]);
            }, 1000);
        }
    }, [data]);

    console.log(songsList)

    return (
        <>
            <SongsContainer>
                    <AnimatePresence exitBeforeEnter>
                        {
                            loaderShow
                            ?
                            <Loader key="loader" />
                            :
                            <motion.div key="songs" className='songs' initial='hidden' animate='visible' exit='exit' variants={songsVariants}>
                                {
                                    songsList?.map(item => (
                                        <Song key={item.track.track_id} variants={songVariants} whileTap={{ scale: 0.8 }}>
                                            <p className='song-name'>{item.track.track_name}</p>
                                            <p className='song-artist'>{item.track.artist_name}</p>{console.log(item?.track?.primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name)}
                                            <p className='song-genre'>{item?.track?.primary_genres?.music_genre_list[0]?.music_genre?.music_genre_name}</p>
                                            <div className='song-hover'><p>Click For More Details</p></div>
                                        </Song>
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
    height: 80%;
    user-select: none;

    .songs {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        max-width: 70%;
        max-height: 90%;
        overflow: hidden scroll;

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
    border-radius: 7px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 12px;
    cursor: pointer;
    background-color: #ffffff08;
    margin: 1rem;
    font-family: 'Outfit', sans-serif;
    text-align: center;
    overflow: hidden;
    position: relative;

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
        background: linear-gradient(0deg, rgb(0,0,0) 2%, rgba(0,212,255,0) 80%);
        font-weight: 500;
        font-size: .8rem;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 5%;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: top .3s, opacity .3s;

        p {
            position: absolute;
            bottom: 1rem;
        }
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        &:hover {
            .song-hover {
                top: 0;
                opacity: 1;
            }
        }
    }
`;

export default Songs;