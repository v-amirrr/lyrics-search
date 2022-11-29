import React, { useState, useEffect } from 'react';

import Songs from './Songs';

import { useGetTrackQuery } from '../redux/apiSlice';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const searchVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween' } }
};

const Search = () => {

    const [searchInput, setSearchInput] = useState("");
    const [searchButtonClicked , setSearchButtonClicked] = useState(false);

    const { data, isLoading, isSuccess } = useGetTrackQuery(searchInput, { skip: !searchButtonClicked });
    
    const searchButtonHandler = e => {
        e.preventDefault();
        setSearchButtonClicked(true);
        setTimeout(() => {
            setSearchButtonClicked(false);
        }, 1000);
    };

    useEffect(() => {
        setSearchButtonClicked(false);
    }, []);

    return (
        <>
            <SearchContainer initial='hidden' animate='visible' exit='exit' variants={searchVariants} data={data || isLoading ? 1 : 0}>
                <div className='search-title'>
                    <h1>search the song and get the lyric</h1>
                </div>

                <form className='search-form'>
                    <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} autoFocus />
                    <motion.button whileTap={{ scale: 0.9 }} type='submit' onClick={searchButtonHandler}>search</motion.button>
                </form>
            </SearchContainer>

            {
                data 
                &&
                <Songs data={data} isLoading={isLoading} isSuccess={isSuccess} />
            }
        </>
    );
};

const SearchContainer = styled(motion.div)`
    width: 80%;
    height: ${props => props.data ? "20%" : "100%"};
    margin: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: height .3s;

    .search-title {
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

    .search-form {
        width: 60%;
        margin: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        input {
            all: unset;
            width: 70%;
            padding: .7rem;
            margin: .5rem;
            border-radius: 7px;
            font-size: 1rem;
            font-weight: 200;
            font-family: 'Outfit', sans-serif;
            background-color: #ffffff08;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        button {
            all: unset;
            width: 70%;
            padding: .7rem;
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
            background-color: #ffffff08;
        }
    }
`;

export default Search;