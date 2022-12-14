import React, { useState, useRef } from 'react';

import { IoClose } from 'react-icons/io5';

import "./Search.scss";
import { motion } from 'framer-motion';

const searchVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4, type: 'tween', when: "afterChildren" } }
};

const Search = () => {

    const [searchInput, setSearchInput] = useState("");

    const searchInputRef = useRef();

    const clearButtonHandler = () => {
        setSearchInput("");
        searchInputRef.current.focus();
    };

    return (
        <>
            <motion.div className='search' initial='hidden' animate='visible' exit='exit' variants={searchVariants}>
                <form className='search__form'>
                    <input
                        className='search__form__input'
                        type="text" 
                        value={searchInput} 
                        onChange={e => setSearchInput(e.target.value)} 
                        ref={searchInputRef} 
                        placeholder="Search Song..." 
                        autoFocus
                    />
                    <i className={searchInput ? 'search__form__clear-icon--show' : 'search__form__clear-icon--hide'} onClick={clearButtonHandler}><IoClose /></i>
                    <button className='search__form__submit-btn' type='submit'>search</button>
                </form>
            </motion.div>
        </>
    );
};

export default Search;