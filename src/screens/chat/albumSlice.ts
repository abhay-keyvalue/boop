import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import { Media } from '../../types';

const initialState: any = {
  album: {},
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    addImages: (state, action: PayloadAction<{album: string, images: Media[]}>) => {
      if (state.album[action.payload.album]) {
        state.album[action.payload.album] = [...state.album[action.payload.album], ...action.payload.images];
      } else {
        state.album[action.payload.album] = action.payload.images;
      }
    },
    resetImages: () => initialState,
  },
});

export const {addImages, resetImages} = albumSlice.actions;
export default albumSlice.reducer;
