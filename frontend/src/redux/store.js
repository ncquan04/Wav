import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import authReducer from './features/authSlice';
import { shazamCoreApi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(shazamCoreApi.middleware), 
});
