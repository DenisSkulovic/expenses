import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

const getStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: GetDefaultMiddleware<any>) => getDefaultMiddleware().concat(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default getStore;
