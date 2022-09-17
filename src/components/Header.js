import React, { useState } from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const headerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scaleZ: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween' } }
};

const Header = () => {

    const [searchInput, setSearchInput] = useState("");

    const searchButtonHandler = e => {
        e.preventDefault();
        setSearchInput("");
    };

    return (
        <>
            <HeaderContainer initial='hidden' animate='visible' exit='exit' variants={headerVariants}>
                <div className='header-title'>
                    <h1>enter the song's name and get the lyric</h1>
                </div>

                <form className='header-form'>
                    <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} autoFocus />
                    <motion.button whileTap={{ scale: 0.9 }} type='submit' onClick={searchButtonHandler}>search</motion.button>
                </form>
            </HeaderContainer>
        </>
    );
};

const HeaderContainer = styled(motion.div)`
    width: 80%;
    margin: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .header-title {
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            font-size: 2rem;
            font-weight: 900;
            letter-spacing: -2px;
            word-spacing: 5px;
            white-space: nowrap;
            text-transform: uppercase;
        }
    }

    .header-form {
        width: 60%;
        margin: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        input {
            all: unset;
            width: 70%;
            padding: .5rem;
            margin: .5rem;
            border-radius: 7px;
            font-size: 1.2rem;
            font-weight: 200;
            font-family: 'Outfit', sans-serif;
            background-color: #ffffff08;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        button {
            all: unset;
            width: 70%;
            padding: .5rem;
            border-radius: 7px;
            cursor: pointer;
            user-select: none;
            text-transform: uppercase;
            font-size: 1.2rem;
            letter-spacing: -1px;
            font-weight: 600;
            font-family: 'Outfit', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff22;
        }
    }
`;

export default Header;