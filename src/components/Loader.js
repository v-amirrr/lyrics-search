import React from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const loaderVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.4, type: 'tween' } }
};

const Loader = () => {
    return (
        <>
            <LoaderContainer initial='hidden' animate='visible' exit='exit' variants={loaderVariants}>
                <div class="loader">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </LoaderContainer>
        </>
    );
};

const LoaderContainer = styled(motion.section)`
    margin: 2rem;
    padding: 2rem;

    .line {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 15px;
        background-color: #fff;
    }

    .loader .line:nth-last-child(1) {
        animation: loadingB 1.5s 1s infinite;
    }
    .loader .line:nth-last-child(2) {
        animation: loadingB 1.5s 0.5s infinite;
    }
    .loader .line:nth-last-child(3) {
        animation: loadingB 1.5s 0s infinite;
    }

    @keyframes loadingB {
        0% {
            width: 1rem;
        }
        50% {
            width: 2rem;
        }
        100% {
            width: 1rem;
        }
    }
`;

export default Loader;