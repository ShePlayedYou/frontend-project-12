import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  currentChannel: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload
    },
    setCurrentChannel(state, action) {
      state.currentChannel = action.payload
    },
    addChannel: (state, action) => {
      state.channels = [...state.channels, action.payload]
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload
      state.channels = state.channels.map(channel =>
        channel.id === id ? { ...channel, name } : channel,
      )
    },
    removeChannel: (state, action) => {
      const { id } = action.payload
      state.channels = state.channels.filter(channel => channel.id !== id)
    },
  },
})

export const { setChannels, setCurrentChannel, addChannel, renameChannel, removeChannel } = channelsSlice.actions
export default channelsSlice.reducer
