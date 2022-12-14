import React from 'react';

import "./Loader.scss";
import { motion } from 'framer-motion';

const loaderVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: 'tween' } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3, type: 'tween' } }
};

const Loader = () => {
    return (
        <>
            <motion.div className='loader' initial='hidden' animate='visible' exit='exit' variants={loaderVariants}>
                <div className="loader__container">
                    <div className="loader__container__line"></div>
                    <div className="loader__container__line"></div>
                    <div className="loader__container__line"></div>
                </div>
            </motion.div>
        </>
    );
};

export default Loader;