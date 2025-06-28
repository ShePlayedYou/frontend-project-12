import {
    createSlice,
  } from '@reduxjs/toolkit'

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
        console.log( state.messages, ' state.channels')
      },
      addMessage: (state, action) => {
        state.messages = [...state.messages, action.payload];
        console.log( state.messages, ' state.channels')
      },
      setCurrentMessageId(state, action) {
        state.currentChannelId = action.payload;
      },
    },
  });
  
  export const { setMessages, addMessage, setCurrentMessageId } = messagesSlice.actions;
  export default messagesSlice.reducer;