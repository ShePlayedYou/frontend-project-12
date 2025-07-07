import { createSlice } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice.js';

  const initialState = {
    messages: [],
    currentMessageslId: null,
  };
  
  const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      setMessages: (state, action) => {
        state.messages = action.payload;
      },
      addMessage: (state, action) => {
        state.messages = [...state.messages, action.payload];
      },
      setCurrentMessageId(state, action) {
        state.currentChannelId = action.payload;
      },
    },
    extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const { id } = action.payload;
        state.messages = state.messages.filter((message) => message.channelId !== id);
      });
  },
  });
  
  export const { setMessages, addMessage, setCurrentMessageId } = messagesSlice.actions;
  export default messagesSlice.reducer;