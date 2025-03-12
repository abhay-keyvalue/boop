import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import { Itinerary } from '../../types';

const initialState: any = {
  itinerary: null,
};

export const latestItinerarySlice = createSlice({
  name: 'latestItinerary',
  initialState,
  reducers: {
    setLatestItinerary: (state, action: PayloadAction<Itinerary>) => {
      state.itinerary = action.payload;
    },
    resetLatestItinerary: () => initialState
  }
});

export const {setLatestItinerary, resetLatestItinerary} = latestItinerarySlice.actions;
export default latestItinerarySlice.reducer;
