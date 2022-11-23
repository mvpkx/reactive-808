import {configureStore} from '@reduxjs/toolkit';
import drumMachineSlice from '../features/drum-machine/drumMachineSlice';

export const store = configureStore({
  reducer: {drumMachine: drumMachineSlice},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
