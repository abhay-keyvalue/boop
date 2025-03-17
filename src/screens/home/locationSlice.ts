import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  currentLocation: {},
  routeCoordinates: [],
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{latitude?: number, longitude?: number}>) => {
      state.currentLocation = action.payload;
    },
    setRouteCoordinates: (state, action: PayloadAction<{latitude: number, longitude: number}[]>) => {
      state.routeCoordinates = action.payload;
    },
    addNewRouteCoordinate: (state, action: PayloadAction<{latitude: number, longitude: number}>) => {
      state.routeCoordinates.push(action.payload);
    },
    resetLocation: () => initialState,
  },
});

export const {setLocation, resetLocation, setRouteCoordinates, addNewRouteCoordinate} = locationSlice.actions;
export default locationSlice.reducer;
