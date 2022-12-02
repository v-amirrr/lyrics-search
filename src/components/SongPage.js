import React from 'react';

import { useParams } from 'react-router-dom';

const SongPage = () => {

    const { id } = useParams();

    return (
        <>
            {id}
        </>
    );
};

export default SongPage;