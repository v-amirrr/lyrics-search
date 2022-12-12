import React, { useState, useEffect } from 'react';

import "./WarningPopup.scss"
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

// const PopupPage = styled(motion.section)`
//     width: 100vw;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     background-color: #000000aa;
//     z-index: 9;
//     position: absolute;
//     inset: 0 0 0 0;
//     backdrop-filter: blur(15px) saturate(100%);
//     -webkit-backdrop-filter: blur(15px) saturate(100%);

//     .popup-container {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         flex-direction: column;
//         width: fit-content;
//         height: 50%;
//         max-width: 70%;
//         max-height: 50%;
//         padding: 2rem;
//         text-align: center;
//     }

//     .popup-title {
//         text-transform: uppercase;
//         letter-spacing: -2px;
//         word-spacing: 6px;
//     }

//     .popup-warning {
//         margin: 1rem;
//         color: #ff0000;
//         font-weight: 400;
//     }

//     .popup-text {
//         word-spacing: 2px;
//         font-weight: 400;
//         font-size: .8rem;
//         color: #ccc;
//         margin: .7rem;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }

//     .popup-button {
//         margin-top: 1rem;
//         font-size: 1.2rem;
//         font-weight: 600;
//         border: none;
//         cursor: pointer;
//         text-transform: uppercase;
//         border-radius: 50px;
//         font-family: 'Outfit', sans-serif;
//         background-color: #ffffff08;
//         box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
//         width: 20rem;
//         height: 2.5rem;
//         transition: background .3s;

//         &:hover {
//             background-color: #ffffff15;
//         }

//         &:active {
//             background-color: #ffffff22;
//         }
//     }

//     @media (max-width: 900px) {
//         .popup-container {
//             max-width: 90%;
//             max-height: 40%;
//             padding: .5rem;
//         }

//         .popup-title {
//             font-size: 1.2rem;
//         }

//         .popup-warning {
//             font-size: .8rem;
//         }

//         .popup-text {
//             font-size: .6rem;
//         }
//     }
// `;

export default WarningPopup;