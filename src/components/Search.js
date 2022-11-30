import React, { useState, useEffect, useRef } from 'react';

import Songs from './Songs';

import { useGetTrackQuery } from '../redux/apiSlice';

import { IoClose } from 'react-icons/io5';

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

    const { data, isLoading, isSuccess } = useGetTrackQuery(searchInput, { 
        skip: !searchButtonClicked,
        selectFromResult: ({ data }) => ({
            data: data?.message?.body?.track_list,
        }),
    });
    
    const searchButtonHandler = e => {
        e.preventDefault();
        setSearchButtonClicked(true);
        setTimeout(() => {
            setSearchButtonClicked(false);
        }, 1000);
    };

    const clearButtonHandler = () => {
        setSearchInput("");
        searchInputRef.current.focus();
    };

    useEffect(() => {
        setSearchButtonClicked(false);
    }, []);

    const searchInputRef = useRef();

    return (
        <>
            <SearchContainer initial='hidden' animate='visible' exit='exit' variants={searchVariants} data={data || isLoading ? 1 : 0} clearbuttonshow={searchInput ? 1 : 0}>
                <form className='search-form'>
                    <input ref={searchInputRef} type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Search..." autoFocus />
                    <i className='search-form-clear-icon' onClick={clearButtonHandler}><IoClose /></i>
                    <button type='submit' onClick={searchButtonHandler}>search</button>
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
    margin-top: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: height .3s;

    .search-form {
        position: relative;
        margin: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        font-family: 'Outfit', sans-serif;
        background-color: #ffffff08;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        width: 20rem;
        height: 2.5rem;

        input {
            all: unset;
            padding: 0 1.5rem 0 .7rem;
            font-size: 1rem;
            font-weight: 200;
        }
        
        .search-form-clear-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 5.2rem;
            transform: ${props => props.clearbuttonshow ? "scale(1)" : "scale(0)"};
            border-radius: 50%;
            font-size: 1.3rem;
            cursor: pointer;
            transition: transform .2s;
        }

        button {
            all: unset;
            border-left: 1.3px solid #ffffff22;
            border-radius: 0 50px 50px 0;
            cursor: pointer;
            user-select: none;
            text-transform: uppercase;
            letter-spacing: -1px;
            font-weight: 600;
            font-family: 'Outfit', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background .2s;
            height: 2.5rem;
            width: 5rem;

            &:hover {
                background-color: #ffffff15;
            }

            &:active {
                background-color: #ffffff22;
            }
        }
    }
`;

export default Search;