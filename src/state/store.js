import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './slices/DarkModeSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});
