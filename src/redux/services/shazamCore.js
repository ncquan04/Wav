import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', '54c8faa2fbmsh08a94c147fd669ep18519djsn17d5685dbbe3');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => `/v1/charts/world?country_code=DZ`,
        }),
        getSongDetails: builder.query({
            query: ({songid}) => `/v2/tracks/details?track_id=${songid}`,
        }),
    }),
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
} = shazamCoreApi;