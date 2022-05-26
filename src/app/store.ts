import { configureStore } from '@reduxjs/toolkit';
import { currencyApi } from '../features/currencyApiSlice/currencyApiSlice';

// TODO Galvenās lapas augšā ir konverteris, kas paņem 2 valūtas, un attēlo to savstarpējo kursu
// TODO Nospiežot uz pogas view All, pie katras kartiņas parādās kurss salīdzinot ar nospiesto currency
// TODO Pielikt meklēšanu valūtai/pagination?
// TODO

export const store = configureStore({
  reducer: {
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
