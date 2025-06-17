import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './slices/DarkModeSlice';
import plantsReducer from './slices/PlantsSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    plants: plantsReducer,
  },
});
