import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => `/v1/charts/world?country_code=VN`,
        }),
        getSongsByGenre: builder.query({
            query: (genre) => `v1/charts/genre-world?genre_code=${genre}&country_code=VN`,
        }),
        getSongDetails: builder.query({
            query: ({songid}) => `/v2/tracks/details?track_id=${songid}`,
        }),
        getSongRelated: builder.query({
            query: ({songid}) => `/v1/tracks/related?track_id=${songid}`,
        }),
        getArtistDetails: builder.query({
            query: (artistid) => `v2/artists/details?artist_id=${artistid}`,
        }),
        getSongsByCountry: builder.query({
            query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
        }),
        getSongsBySearch: builder.query({
            query: (searchTerm) => `v1/search/multi?offset=0&search_type=SONGS_ARTISTS&query=${searchTerm}`,
        }),
    }),
});

export const {
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery
} = shazamCoreApi;