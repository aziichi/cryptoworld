import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoaApiHeaders = {
    'X-RapidAPI-Host': import.meta.env.VITE_COIN_RANKING_HOST,
    'X-RapidAPI-Key':  import.meta.env.VITE_RAPID_API_KEY_COINS,
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({
    url,
    headers: cryptoaApiHeaders,
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder)=> ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi