import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface Stop {
  location: Location;
  duration: string;
}

interface Itinerary {
  tripName: string;
  startLocation: Location;
  endLocation: Location;
  stops: Stop[];
}



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
