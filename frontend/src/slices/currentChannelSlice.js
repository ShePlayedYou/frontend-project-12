import { createSlice } from '@reduxjs/toolkit'

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState: { current: null },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.current = action.payload
    },
  },
})

export const { setCurrentChannel } = currentChannelSlice.actions
export default currentChannelSlice.reducer
