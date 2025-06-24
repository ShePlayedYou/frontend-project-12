import {
    createSlice,
  } from '@reduxjs/toolkit'

  const initialState = {
    channels: [],
    currentChannel: null,
  };
  
  const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
      setChannels: (state, action) => {
        state.channels = action.payload;
      },
      setCurrentChannel(state, action) {
        state.currentChannel = action.payload;
      },
    },
  });
  
  export const { setChannels, setCurrentChannel } = channelsSlice.actions;
  export default channelsSlice.reducer;