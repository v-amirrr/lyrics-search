import React from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const songsVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.4, type: 'tween' } }
};

const Songs = ({ data }) => {

    return (
        <>
            <SongsContainer initial='hidden' animate='visible' exit='exit' variants={songsVariants}>
                {
                    data?.message.body.track_list.map(item => (
                        <div key={item.track.track_id}>
                            {item.track.track_name}
                        </div>
                    ))
                }
            </SongsContainer>
        </>
    );
};

const SongsContainer = styled(motion.section)`
    width: 80%;
    margin: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default Songs;