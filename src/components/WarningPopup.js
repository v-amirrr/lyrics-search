import React, { useState, useEffect } from 'react';

import "./WarningPopup.scss";
import { motion, AnimatePresence } from 'framer-motion';

const popUpPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween', when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween', when: "afterChildren" } }
};

const popUpContainerVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.1 } }
};

const popUpItemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: { opacity: 1, y: [-20, 20, 0], scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, y: 20, scaleX: 0, transition: { duration: 0.4, type: 'tween' } }
};

const WarningPopup = () => {

    const [warningPopup, setWarningPopup] = useState(false);

    useEffect(() => {
        if (!!sessionStorage.getItem("warning-popup") == true) {
            setWarningPopup(false);
        } else {
            setWarningPopup(true);
        }
    }, []);
    
    const warningPopUpSubmitHandler = e => {
        e.preventDefault();
        setWarningPopup(false);
        sessionStorage.setItem("warning-popup", "true");
    };
    
    return (
        <>
            <AnimatePresence>
                {
                    warningPopup
                    &&
                    <motion.section className='warning-popup' initial='hidden' animate='visible' exit='exit' variants={popUpPageVariants} onKeyUp={e => e.key === "Enter" && warningPopUpSubmitHandler}>
                        <motion.div className="warning-popup__container" variants={popUpContainerVariants}>
                            <motion.h1 className="warning-popup__title" variants={popUpItemVariants}>
                                things you need to know
                            </motion.h1>
                            <motion.p className="warning-popup__warning-text" variants={popUpItemVariants}>
                                If you're in sanctioned countries like <b>Iran</b>, you have to turn on your <b>VPN</b> for using the app.
                            </motion.p>
                            <motion.p className="warning-popup__description-text" variants={popUpItemVariants}>
                                In this app you can search for any song you want and then if you click on them, you'll see more information about that song, such as artist, album, genre, lyrics and etc.
                            </motion.p>
                            <motion.button className="warning-popup__button" variants={popUpItemVariants} onClick={warningPopUpSubmitHandler} autoFocus>let's go</motion.button>
                        </motion.div>
                    </motion.section>
                }
            </AnimatePresence>
        </>
    );
};

export default WarningPopup;