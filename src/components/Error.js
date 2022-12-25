import React from 'react';

import "./Error.scss";
import { motion } from 'framer-motion';

const errorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: [0.8, 1.05, 1], transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4, type: 'tween' } }
};

const Error = () => {
    return (
        <>
            <motion.section className='error-container' initial='hidden' animate='visible' exit='exit' variants={errorVariants}>
                <p className='error-container__message'>
                    Looks like we have a problem.<br />Please check your connection status and try again.
                </p>
                <p className='error-container__warning'>
                    If you're in sanctioned countries like <b>Iran</b>, you have to turn on your <b>VPN</b> for using the app. If you're already using a VPN, clearly it's not working so please use another one.
                </p>
            </motion.section> 
        </>
    );
};

export default Error;