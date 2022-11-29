import React, { useState, useEffect } from 'react';

import Loader from "./Loader";

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const songsVariants = {
    visible: { transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.2, type: 'tween', when: "beforeChildren" } }
};

const songVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, type: 'tween' } }
};

const Songs = ({ data, isLoading }) => {

    const [loaderShow, setLoaderShow] = useState(false);

    useEffect(() => {
        setLoaderShow(true);
        if (!isLoading) {
            setTimeout(() => {
                setLoaderShow(false);
            }, 1000);
        }
    }, [data]);

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
                                    data?.message?.body?.track_list.map(item => (
                                        <Song key={item.track.track_id} variants={songVariants}>
                                            {item.track.track_name}
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
    margin: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;    

    .songs {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

const Song = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default Songs;