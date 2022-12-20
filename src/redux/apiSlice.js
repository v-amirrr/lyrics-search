import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.musixmatch.com/ws/1.1/' }),
    endpoints: (builder) => ({
        getTrack: builder.query({
            query: (songName) => ({ url: `track.search?q_track=${songName}&apikey=${process.env.REACT_APP_API_KEY}` }),
        }),
        getLyrics: builder.query({
            query: (songId) => ({ url: `track.lyrics.get?track_id=${songId}&apikey=${process.env.REACT_APP_API_KEY}` }),
        }),
    }),
});

export const { useGetTrackQuery, useGetLyricsQuery } = apiSlice;

export default apiSlice;