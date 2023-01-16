import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from "../redux/searchSlice";

import { useGetSearchTracksQuery } from '../redux/apiSlice';

import { IoClose } from 'react-icons/io5';

import "./Search.scss";
import { motion } from 'framer-motion';

const searchVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4, type: 'tween', when: "afterChildren" } }
};

const Search = () => {

    const dispatch = useDispatch();

    const [inputText, setInputText] = useState("");
    const [searchButtonClicked , setSearchButtonClicked] = useState(false);

    const searchInput = useSelector(state => state.searchStore.searchInputText);

    const searchInputRef = useRef();

    const clearButtonHandler = () => {
        setInputText("");
        searchInputRef.current.focus();
    };

    const searchSubmitHandler = e => {
        e.preventDefault();
        setSearchButtonClicked(true);
        dispatch(setSearch(inputText));

        // keyboard situation in mobiles
        if (is_touch_enabled()) {
            searchInputRef.current.blur();
        }
    };

    const { data } = useGetSearchTracksQuery(searchInput.toLowerCase(), { 
        skip: !searchButtonClicked
    });

    useEffect(() => {
        setSearchButtonClicked(false);
    }, [data]);

    useEffect(() => {
        setInputText(searchInput);
    }, []);

    const is_touch_enabled = () => {
        return ( 'ontouchstart' in window ) ||
            ( navigator.maxTouchPoints > 0 ) ||
            ( navigator.msMaxTouchPoints > 0 );
    };

    return (
        <>
            <motion.div className={searchInput || searchButtonClicked ? 'search search--half' : 'search search--full'} initial='hidden' animate='visible' exit='exit' variants={searchVariants}>
                <form className='search__form'>
                    <input
                        className='search__form__input'
                        type="text"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        ref={searchInputRef}
                        placeholder="Search a song..."
                        autoFocus={!is_touch_enabled()}
                    />
                    <i className={inputText ? 'search__form__clear-icon--show' : 'search__form__clear-icon--hide'} onClick={clearButtonHandler}><IoClose /></i>
                    <button className='search__form__submit-btn' type='submit' onClick={searchSubmitHandler}>search</button>
                </form>
            </motion.div>
        </>
    );
};

export default Search;