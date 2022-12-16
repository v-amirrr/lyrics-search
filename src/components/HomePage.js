import React from 'react';

import { useSelector } from 'react-redux';

import Search from './Search';
import Songs from './Songs';

import "./HomePage.scss";

const HomePage = () => {

    const searchInput = useSelector(state => state.searchStore.searchInputText);

    return (
        <>
            <section className='home'>
                <Search />
                {
                    searchInput
                    &&
                    <Songs />
                }
            </section>
        </>
    );
};

export default HomePage;