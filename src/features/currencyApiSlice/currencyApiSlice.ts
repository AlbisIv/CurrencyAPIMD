/* eslint-disable camelcase */
// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type SingleCurrency = {
}
type AllCurrenciesResponse = {
  }

// Define a service using a base URL and expected endpoints
export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest' }), // galvenais prasījums
  endpoints: (builder) => ({ // Papildus prasījumi
    getCurrencyByName: builder.query<any, string | undefined>({
      query: (name) => `currencies/${name}.json`,
    }),
    getTwoCurrenciesByName: builder.query<SingleCurrency, string | undefined>({
      query: (name) => (name ? `currencies/${name}.json` : ''),
    }),
    getAllCurrencies: builder.query<AllCurrenciesResponse, void>({
      query: () => 'currencies.json',
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetCurrencyByNameQuery, useGetAllCurrenciesQuery, useGetTwoCurrenciesByNameQuery } = currencyApi;

export default currencyApi;
