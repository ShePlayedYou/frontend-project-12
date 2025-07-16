import { useEffect } from 'react'
import socket from '../services/socket.js'
import store from '../slices/indexStore.js'
import { setCurrentChannel } from '../slices/currentChannelSlice.js'
import { channelsApi } from '../slices/channelsApi.js'
import { messagesApi } from '../slices/messagesApi.js'

const useSocketIntegration = () => {
  useEffect(() => {
    socket.on('newChannel', (channel) => {
      store.dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          draft.push(channel)
        }),
      )
    })

    socket.on('renameChannel', (updated) => {
      store.dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          const index = draft.findIndex(ch => ch.id === updated.id)
          if (index !== -1) draft[index].name = updated.name
        }),
      )
    })

    socket.on('removeChannel', ({ id }) => {
      store.dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, draft =>
          draft.filter(ch => ch.id !== id),
        ),
      )

      store.dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, draft =>
          draft.filter(msg => msg.channelId !== id),
        ),
      )

      const state = store.getState()
      const currentChannel = state.currentChannel.current
      const allChannels = channelsApi.endpoints.getChannels.select()(state)?.data ?? []

      if (currentChannel?.id === id) {
        const generalChannel = allChannels.find(ch => ch.name === 'general' || ch.id === '1')
        if (generalChannel) {
          store.dispatch(setCurrentChannel(generalChannel))
        }
      }
    })

    socket.on('newMessage', (message) => {
      store.dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
          draft.push(message)
        }),
      )
    })

    return () => {
      socket.off('newChannel')
      socket.off('renameChannel')
      socket.off('removeChannel')
      socket.off('newMessage')
    }
  }, [])
}

export default useSocketIntegration
