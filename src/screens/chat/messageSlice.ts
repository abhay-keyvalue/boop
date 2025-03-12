import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import { ChatMessage } from '../../types';

const initialState: any = {
  messages: null,
};

export const messageSlice = createSlice({
  name: 'messageList',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages = [...(state.messages || []), action.payload];
    },
    resetMessages: () => initialState,
  },
});

export const {setMessages, resetMessages, addNewMessage} = messageSlice.actions;
export default messageSlice.reducer;
