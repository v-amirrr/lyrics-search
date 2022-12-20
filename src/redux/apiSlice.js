import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.musixmatch.com/ws/1.1/' }),
    endpoints: (builder) => ({
        getSearchTracks: builder.query({
            query: (songName) => ({ url: `track.search?q_track=${songName}&apikey=${process.env.REACT_APP_API_KEY}` }),
        }),
        getLyrics: builder.query({
            query: (songId) => ({ url: `track.lyrics.get?commontrack_id=${songId}&apikey=${process.env.REACT_APP_API_KEY}` }),
        }),
        getTrack: builder.query({
            query: (songId) => ({ url: `track.get?commontrack_id=${songId}&apikey=${process.env.REACT_APP_API_KEY}` }),
        }),
    }),
});

export const { useGetSearchTracksQuery, useGetLyricsQuery, useGetTrackQuery } = apiSlice;

export default apiSlice;