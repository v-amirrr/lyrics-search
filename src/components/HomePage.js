import React from 'react';

import Search from './Search';

import "./HomePage.scss";

const HomePage = () => {
    return (
        <>
            <section className='home'>
                <Search />
            </section>
        </>
    );
};

export default HomePage;