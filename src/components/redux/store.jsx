// store.js
import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './features';

const store = configureStore({
  reducer: {
    data: dataSlice,
  },
});

export default store;
